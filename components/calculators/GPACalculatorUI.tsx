'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { calculateGPA, CourseRow } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  F: 0.0,
};

export function GPACalculatorUI() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: '1', name: 'Calculus I', credits: 4, gradePoint: 4.0 },
    { id: '2', name: 'English Composition', credits: 3, gradePoint: 3.7 },
    { id: '3', name: 'Physics Lab', credits: 3, gradePoint: 3.0 },
    { id: '4', name: 'Microeconomics', credits: 3, gradePoint: 3.3 },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), name: `Course ${courses.length + 1}`, credits: 3, gradePoint: 4.0 },
    ]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  function updateCourse<Field extends keyof CourseRow>(
    id: string,
    field: Field,
    value: CourseRow[Field]
  ) {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  }

  const results = calculateGPA(courses);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Course List ({courses.length})
          </h4>
          <Button onClick={addCourse} size="sm" variant="outline" className="gap-1 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Course
          </Button>
        </div>

        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-2 items-center bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/80">
              <div className="col-span-5">
                <Input
                  type="text"
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="col-span-3">
                <Input
                  type="number"
                  placeholder="Credits"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={course.credits}
                  onChange={(e) => {
                    const credits = Number.parseFloat(e.target.value);
                    updateCourse(
                      course.id,
                      'credits',
                      Number.isFinite(credits) ? Math.max(0, Math.min(12, credits)) : 0
                    );
                  }}
                  className="h-9 text-xs"
                />
              </div>

              <div className="col-span-3">
                <Select
                  value={Object.keys(GRADE_POINTS).find((k) => GRADE_POINTS[k] === course.gradePoint) || 'A'}
                  onChange={(e) => updateCourse(course.id, 'gradePoint', GRADE_POINTS[e.target.value])}
                  className="h-9 text-xs"
                >
                  {Object.entries(GRADE_POINTS).map(([grade, pt]) => (
                    <option key={grade} value={grade}>
                      {grade} ({pt.toFixed(1)})
                    </option>
                  ))}
                </Select>
              </div>

              <div className="col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-1 text-zinc-500 hover:text-rose-400 disabled:opacity-30 transition-colors"
                  aria-label="Remove Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Cumulative Grade Point Average (GPA)"
          value={results.gpa.toFixed(2)}
          subText="Weighted 4.0 scale average"
          isPrimary
        />
        <ResultDisplay
          label="Total Credit Hours"
          value={results.totalCredits.toFixed(1)}
          subText="Sum of enrolled course credits"
        />
        <ResultDisplay
          label="Total Grade Points Earned"
          value={results.totalPoints.toFixed(1)}
          subText="Credits × Grade Points"
        />
      </div>
    </div>
  );
}
