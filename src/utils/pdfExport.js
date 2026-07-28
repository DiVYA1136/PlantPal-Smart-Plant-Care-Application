import jsPDF from 'jspdf';

export const exportPlantReportPDF = (plant) => {
  const doc = new jsPDF();

  // Header background banner
  doc.setFillColor(22, 163, 74); // Emerald 600
  doc.rect(0, 0, 210, 40, 'F');

  // App Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('PlantPal Smart Care Passport', 15, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 150, 25);

  // Plant Name & Species
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(plant.plantName || 'Houseplant', 15, 55);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text(plant.species || 'Botanical Species', 15, 63);

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, 68, 195, 68);

  // Vital Specs Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 75, 180, 50, 3, 3, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Care Requirements & Environment', 20, 85);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  doc.text(`• Category: ${plant.category || 'Indoor'}`, 20, 95);
  doc.text(`• Water Frequency: Every ${plant.waterFrequency} days`, 20, 103);
  doc.text(`• Fertilizer Schedule: Every ${plant.fertilizerFrequency} days`, 20, 111);
  doc.text(`• Sunlight Requirement: ${plant.sunlight || 'Bright Indirect'}`, 20, 119);

  doc.text(`• Ideal Temperature: ${plant.temperature || '18-25°C'}`, 110, 95);
  doc.text(`• Target Humidity: ${plant.humidity || '50%+' }`, 110, 103);
  doc.text(`• Last Watered: ${plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : 'N/A'}`, 110, 111);
  doc.text(`• Next Due Water: ${plant.nextWaterDate ? new Date(plant.nextWaterDate).toLocaleDateString() : 'N/A'}`, 110, 119);

  // Notes Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Caregiver Notes & Custom Tips:', 15, 138);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const splitNotes = doc.splitTextToSize(plant.notes || 'No custom caregiver notes added yet.', 180);
  doc.text(splitNotes, 15, 146);

  // Growth Logs Table Header
  let currentY = 165;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Growth History Log:', 15, currentY);

  currentY += 8;
  doc.setFillColor(220, 252, 231); // Emerald 100
  doc.rect(15, currentY, 180, 8, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('Date', 20, currentY + 5.5);
  doc.text('Height (cm)', 60, currentY + 5.5);
  doc.text('Health Status', 100, currentY + 5.5);
  doc.text('Milestone Notes', 140, currentY + 5.5);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  if (plant.growthHistory && plant.growthHistory.length > 0) {
    plant.growthHistory.forEach((log) => {
      if (currentY > 270) return;
      doc.text(log.date || '-', 20, currentY + 5);
      doc.text(`${log.height || 0} cm`, 60, currentY + 5);
      doc.text(log.health || 'Good', 100, currentY + 5);
      doc.text((log.notes || '-').substring(0, 30), 140, currentY + 5);
      currentY += 7;
    });
  } else {
    doc.text('No growth logs recorded yet.', 20, currentY + 5);
  }

  // Footer text
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated with PlantPal Portfolio SaaS App — Professional Plant Care System', 15, 285);

  doc.save(`${plant.plantName.toLowerCase().replace(/\s+/g, '-')}-care-report.pdf`);
};
