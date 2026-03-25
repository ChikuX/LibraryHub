/**
 * API service — all fetch functions for the College Digital Library.
 */
import type { Course, Department, Note, PYQ } from "@/types/api";

const BASE = `${import.meta.env.VITE_API_BASE_URL}/api` || "http://localhost:5000/api";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const STATIC_COURSES: Course[] = [
  { key: "BTECH", name: "BTECH", requiresDepartment: true },
  { key: "BBA", name: "BBA", requiresDepartment: false },
  { key: "BCA", name: "BCA", requiresDepartment: false },
  { key: "MBA", name: "MBA", requiresDepartment: false },
  { key: "MCA", name: "MCA", requiresDepartment: false },
  { key: "BHMCT", name: "BHMCT", requiresDepartment: false },
  { key: "BSERIT", name: "BSERIT", requiresDepartment: false },
  { key: "BSEMLS", name: "BSEMLS", requiresDepartment: false },
  { key: "BSECCT", name: "BSECCT", requiresDepartment: false },
  { key: "BSEOPT", name: "BSEOPT", requiresDepartment: false },
  { key: "BSEMT", name: "BSEMT", requiresDepartment: false },
  { key: "DIPLOMA", name: "DIPLOMA", requiresDepartment: true }
];

export const STATIC_DEPARTMENTS: Record<string, Department[]> = {
  BTECH: [
    { key: "ME", name: "ME" },
    { key: "CE", name: "CE" },
    { key: "CSE", name: "CSE" },
    { key: "AIML", name: "AIML" },
    { key: "ECE", name: "ECE" },
    { key: "AGRICULTURE", name: "AGRICULTURE" },
    { key: "APPLIED SCIENCE", name: "APPLIED SCIENCE" }
  ],
  DIPLOMA: [
    { key: "CE", name: "CE" },
    { key: "ME", name: "ME" },
    { key: "CSE", name: "CSE" }
  ]
};

/** Returns distinct subjects for a course + optional department (no semester). */
export function getSubjects(
  course: string,
  department?: string
): Promise<string[]> {
  let url = `${BASE}/subjects?course=${encodeURIComponent(course)}`;
  if (department) url += `&department=${encodeURIComponent(department)}`;
  return fetchJSON<string[]>(url);
}

/** Returns notes filtered by course, optional department, and optional semester. */
export function getNotes(
  course: string,
  department?: string | null,
  semester?: string | null
): Promise<Note[]> {
  const params = new URLSearchParams({ course: course.toUpperCase() });
  if (department) params.set("department", department.toUpperCase());
  if (semester) params.set("semester", semester);
  return fetchJSON<Note[]>(`${BASE}/notes?${params.toString()}`);
}

export function searchNotes(q: string): Promise<Note[]> {
  return fetchJSON<Note[]>(`${BASE}/search?q=${encodeURIComponent(q)}`);
}

export function getPyqs(
  course: string,
  department?: string | null,
  semester?: string | null
): Promise<PYQ[]> {
  const params = new URLSearchParams({ course: course.toUpperCase() });
  if (department) params.set("department", department.toUpperCase());
  if (semester) params.set("semester", semester);
  return fetchJSON<PYQ[]>(`${BASE}/pyqs?${params.toString()}`);
}
