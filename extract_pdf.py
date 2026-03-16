import PyPDF2

def extract_text_from_pdf(pdf_path, output_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
            
    with open(output_path, 'w', encoding='utf-8') as outfile:
        outfile.write(text)

if __name__ == "__main__":
    pdf_path = "Project_Technical_Requirements (2).pdf"
    output_path = "pdf_content_utf8.txt"
    try:
        extract_text_from_pdf(pdf_path, output_path)
        print("Done")
    except Exception as e:
        print(f"Error reading PDF: {e}")
