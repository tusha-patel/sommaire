import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fetch from "node-fetch";


export async function fetchAndExtracPdfText(fileUrl: string) {
    console.log(fileUrl, "This is a file urls ");

    const response = await fetch(fileUrl);

    console.log(response, "response");

    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));
    console.log(loader);

    const docs = await loader.load();
    console.log(docs, "docs");

    return docs.map((doc) => doc.pageContent).join("\n")
}