/**
 * API response types matching the backend/DB schema.
 */

export interface Course {
  key: string;
  name: string;
  requiresDepartment: boolean;
}

export interface Department {
  key: string;
  name: string;
}

export interface Note {
  id: string;
  file_url: string;
  subject: string;
  display_name: string;
  display_course: string;
  display_department: string | null;
  display_semester: string;
  display_session: string;
  created_at: string;
}

export interface PYQ {
  id: string;
  file_url: string;
  subject: string;
  display_name: string;
  display_course: string;
  display_department: string | null;
  display_semester: string;
  year: number;
  created_at: string;
}
