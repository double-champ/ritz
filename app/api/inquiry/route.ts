import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "data", "inquiries.json");

interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  experienceType?: string;
  message?: string;
  status: string;
  adminNote?: string;
  createdDate: string;
}

// Helper to read database
function readInquiries(): Inquiry[] {
  try {
    if (!fs.existsSync(dbPath)) {
      // Create empty db if doesn't exist
      fs.writeFileSync(dbPath, JSON.stringify([]));
      return [];
    }
    const fileData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileData) as Inquiry[];
  } catch (error) {
    console.error("Failed to read inquiries JSON database:", error);
    return [];
  }
}

// Helper to write database
function writeInquiries(data: Inquiry[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to write to inquiries JSON database:", error);
    return false;
  }
}

// GET all inquiries
export async function GET() {
  const inquiries = readInquiries();
  // Sort by createdDate desc
  const sorted = [...inquiries].sort(
    (a: Inquiry, b: Inquiry) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  return NextResponse.json(sorted);
}

// POST new booking inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, checkIn, checkOut, guests, experienceType, message } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required fields." },
        { status: 400 }
      );
    }

    const inquiries = readInquiries();

    const newInquiry = {
      id: `inq-${Date.now()}`,
      fullName,
      phone,
      email: email || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      guests: guests || "1",
      experienceType: experienceType || "room-stay",
      message: message || "",
      status: "New",
      adminNote: "",
      createdDate: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    const success = writeInquiries(inquiries);

    if (!success) {
      return NextResponse.json({ error: "Failed to persist database record." }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Booking inquiry submitted successfully.", inquiryId: newInquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry POST API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT (update status or admin note)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, adminNote } = body;

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required for updates." }, { status: 400 });
    }

    const inquiries = readInquiries();
    const idx = inquiries.findIndex((inq: Inquiry) => inq.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    // Apply updates if present
    if (status !== undefined) inquiries[idx].status = status;
    if (adminNote !== undefined) inquiries[idx].adminNote = adminNote;

    const success = writeInquiries(inquiries);
    if (!success) {
      return NextResponse.json({ error: "Failed to save update." }, { status: 500 });
    }

    return NextResponse.json({ message: "Inquiry updated successfully." });
  } catch (error) {
    console.error("Inquiry PUT API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE inquiry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required for deletion." }, { status: 400 });
    }

    const inquiries = readInquiries();
    const filtered = inquiries.filter((inq: Inquiry) => inq.id !== id);

    if (inquiries.length === filtered.length) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    const success = writeInquiries(filtered);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete record." }, { status: 500 });
    }

    return NextResponse.json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Inquiry DELETE API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
