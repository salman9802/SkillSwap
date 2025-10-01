export function downloadCSVData(data: string) {
  // Convert the data to CSV format
  let csv = "data:text/csv;charset=utf-8,";
  csv += data;

  //   create link element
  const a = document.createElement("a");
  a.setAttribute("href", encodeURI(csv));
  a.setAttribute("download", "data.csv");
  a.style.display = "none";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export function downloadAsPDF(data: string) {
  const printWindow = document.open("", "", "width=800,height=600");
  if (printWindow === null)
    throw new Error("Operation failed: Unable to create window");
  // Build the HTML document dynamically
  printWindow.document.write(data);
  printWindow.document.close();

  // Wait for content to be ready
  printWindow.onload = function () {
    // Create <style> element dynamically
    const style = printWindow.document.createElement("style");
    style.textContent = `
        `;

    // Append style to head
    printWindow.document.head.appendChild(style);

    // Trigger print
    printWindow.focus(); // For Safari
    printWindow.print();

    // Optional: Close window after printing
    printWindow.onafterprint = function () {
      printWindow.close();
    };
  };
}
