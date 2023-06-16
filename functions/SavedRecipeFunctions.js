import html2pdf from 'html2pdf.js';

export const handleExport = (data) => {
    const exportData = () => {
        try {
            // Convert the data to HTML format
            const htmlContent = `
              <html>
                <body>
                  <h1>${data.name}</h1>
                  <p>  ${data.description}  </p>
                </body>
              </html>
            `;
        
            // Create an element with the HTML content
            const element = document.createElement('div');
            element.innerHTML = htmlContent;

            const options = {
                filename: data.name,
              };
        
            // Convert the element to PDF
            html2pdf().set(options).from(element).save();
        
            console.log('Data exported as PDF successfully!');
          } catch (error) {
            console.log('Error exporting data as PDF:', error);
          }
    }

    return exportData

  };

export const handleMobileExport = (data) => {
  const exportData = () => {
    try {
      const formattedData = JSON.stringify(data);

      // Create a temporary anchor element to download the data
      const anchor = document.createElement("a");
      anchor.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
        formattedData
      )}`;
      anchor.download = recipe.name;
      anchor.click();

      console.log("Data exported successfully!");
    } catch (error) {
      console.log("Error exporting data:", error);
    }
  };

  return exportData;
};
