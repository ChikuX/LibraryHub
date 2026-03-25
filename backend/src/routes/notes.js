/**
 * Read-only API routes for the College Digital Library.
 * All endpoints only return approved notes data.
 */
import { Router } from "express";
import pool from "../db.js";

const router = Router();





// ─── GET /notes?course=&department=&semester= ───────
// Returns approved notes. Filters are optional.
router.get("/notes", async (req, res) => {
  try {
    const rawCourse = req.query.course?.toString() || "";
    const rawDepartment = req.query.department?.toString();
    const rawSemester = req.query.semester?.toString();

    const course = rawCourse.toUpperCase();
    const department = (rawDepartment && rawDepartment !== "All") ? rawDepartment.toUpperCase() : null;
    const semester = (rawSemester && rawSemester !== "All") ? rawSemester : null;

    // console.log("[NOTES] RAW QUERY:", req.query);
    // console.log("[NOTES] NORMALIZED:", { course, department, semester });

    if (!course) {
      return res.status(400).json({ error: "course is required" });
    }

    let query = `
      SELECT id, file_url, subject, display_name, display_course,
             display_department, display_semester, display_session, created_at
      FROM notes
      WHERE UPPER(display_course) = $1
        AND ($2::text IS NULL OR UPPER(COALESCE(display_department, '')) = $2)
        AND ($3::text IS NULL OR display_semester::text = $3)
        AND status = 'approved'
      ORDER BY created_at DESC
    `;
    const params = [course, department, semester];

    // console.log("[NOTES] SQL PARAMS:", params);
    const result = await pool.query(query, params);
    // console.log("[NOTES] RESULT COUNT:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── GET /search?q= ─────────────────────────────────────────
// Returns approved notes matching the search query.
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q) return res.json([]);

    const query = `
      SELECT id, file_url, subject, display_name, display_course,
             display_department, display_semester, display_session, created_at
      FROM notes
      WHERE status = 'approved'
        AND (
          subject ILIKE $1 OR
          display_course ILIKE $1 OR
          display_department ILIKE $1
        )
      ORDER BY created_at DESC
      LIMIT 100
    `;
    const result = await pool.query(query, [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error searching notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
