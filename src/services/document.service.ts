import { UploadDocumentDTO } from "../dtos/uploadDocument.dto";


export interface DocumentService {
  uploadDocument(dto: UploadDocumentDTO): Promise<void>;
}