import { jsPDF } from 'jspdf';

export default function ExportButton({ questions, topic }) {
  function handleExport() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Exam: ${topic}`, 14, 20);
    doc.setFontSize(12);

    let y = 35;

    questions.forEach((q, i) => {
      doc.setFont('helvetica', 'bold');
      const qLines = doc.splitTextToSize(`Q${i + 1}. ${q.question}`, 180);
      doc.text(qLines, 14, y);
      y += qLines.length * 7 + 4;

      if (q.options) {
        doc.setFont('helvetica', 'normal');
        q.options.forEach(opt => {
          doc.text(`   ${opt}`, 14, y);
          y += 7;
        });
      }

      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`exam-${topic.slice(0, 20).replace(/\s+/g, '-')}.pdf`);
  }

  return (
    <button onClick={handleExport} className="export-btn">
      📄 Download as PDF
    </button>
  );
}