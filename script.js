//your JS code here. If required.
import { promises as fs } from 'fs'; // ES module way (no require)

async function processGrades() {
  try {
    // Read file asynchronously
    const data = await fs.readFile('students.json', 'utf-8');

    // Split lines
    const lines = data.trim().split('\n');

    // Extract headers
    const headers = lines[0].split(',');

    // Process students
    const students = lines.slice(1).map(line => {
      const values = line.split(',');
      const student = {};
      headers.forEach((h, i) => {
        student[h] = values[i];
      });
      return student;
    });

    // Calculate averages
    students.forEach(student => {
      // Ignore first column (name)
      const grades = Object.keys(student)
        .filter(k => k !== 'name')
        .map(k => Number(student[k]));

      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;

      console.log(`${student.name} → Average Grade: ${avg.toFixed(2)}`);
    });

  } catch (err) {
    console.error('Error reading file:', err);
  }
}

processGrades();
