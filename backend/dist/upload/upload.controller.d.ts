export declare class UploadController {
    uploadImage(file: Express.Multer.File): {
        filename: string;
        original_name: string;
        mimetype: string;
        size: number;
        url: string;
    };
    uploadSpace(file: Express.Multer.File): {
        filename: string;
        url: string;
    };
    uploadMember(file: Express.Multer.File): {
        filename: string;
        url: string;
    };
}
