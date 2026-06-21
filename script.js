// Current Date
document.getElementById("invoiceDate").textContent =
new Date().toLocaleDateString("en-IN");

// Invoice Number
generateInvoiceNumber();

function generateInvoiceNumber() {
    document.getElementById("invoiceNumber").textContent =
    "INV-" + Math.floor(10000 + Math.random() * 90000);
}

// Currency Format
function formatCurrency(amount) {
    return Number(amount).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Generate Invoice
function generateInvoice() {

    let company =
        document.getElementById("companyName").value.trim();

    let companyGST =
        document.getElementById("companyGST").value.trim();

    let client =
        document.getElementById("clientName").value.trim();

    let clientGST =
        document.getElementById("clientGST").value.trim();

    let service =
        document.getElementById("serviceName").value.trim();

    let amount =
        parseFloat(document.getElementById("amount").value);

    let gstRate =
        parseFloat(document.getElementById("gstRate").value);

    if (
        company === "" ||
        client === "" ||
        service === "" ||
        isNaN(amount) ||
        amount <= 0
    ) {
        alert("Please fill all required fields.");
        return;
    }

    let gstAmount =
        (amount * gstRate) / 100;

    let cgst =
        gstAmount / 2;

    let sgst =
        gstAmount / 2;

    let total =
        amount + gstAmount;

    // Preview

    document.getElementById("previewCompany")
        .textContent = company;

    document.getElementById("previewCompanyGST")
        .textContent =
        companyGST || "Not Provided";

    document.getElementById("previewClient")
        .textContent = client;

    document.getElementById("previewClientGST")
        .textContent =
        clientGST || "Not Provided";

    document.getElementById("previewService")
        .textContent = service;

    document.getElementById("baseAmount")
        .textContent =
        formatCurrency(amount);

    document.getElementById("gstAmount")
        .textContent =
        formatCurrency(gstAmount);

    document.getElementById("cgstAmount")
        .textContent =
        formatCurrency(cgst);

    document.getElementById("sgstAmount")
        .textContent =
        formatCurrency(sgst);

    document.getElementById("totalAmount")
        .textContent =
        formatCurrency(total);

    generateInvoiceNumber();
}

// Reset Form
function resetForm() {

    document.getElementById("companyName").value = "";
    document.getElementById("companyGST").value = "";

    document.getElementById("clientName").value = "";
    document.getElementById("clientGST").value = "";

    document.getElementById("serviceName").value = "";
    document.getElementById("amount").value = "";

    document.getElementById("gstRate").value = "18";

    document.getElementById("previewCompany")
        .textContent = "Your Company";

    document.getElementById("previewCompanyGST")
        .textContent = "GSTIN";

    document.getElementById("previewClient")
        .textContent = "Client Name";

    document.getElementById("previewClientGST")
        .textContent = "GSTIN";

    document.getElementById("previewService")
        .textContent = "Service Name";

    document.getElementById("baseAmount")
        .textContent = "0";

    document.getElementById("gstAmount")
        .textContent = "0";

    document.getElementById("cgstAmount")
        .textContent = "0";

    document.getElementById("sgstAmount")
        .textContent = "0";

    document.getElementById("totalAmount")
        .textContent = "0";

    generateInvoiceNumber();
}

// Download PDF
function downloadPDF() {

    const invoice =
        document.getElementById("invoice");

    const options = {

        margin: 0.5,

        filename:
            "Smart-Invoice.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };

    html2pdf()
        .set(options)
        .from(invoice)
        .save();
}