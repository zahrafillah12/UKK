export declare class AppController {
    getRoot(): {
        status: boolean;
        statusCode: number;
        message: string;
        data: {
            name: string;
            version: string;
            status: string;
            swagger_docs: string;
            description: string;
            documentation_links: {
                swagger: string;
                swagger_json: string;
            };
        };
        timestamp: string;
    };
    getHealth(): {
        status: boolean;
        statusCode: number;
        message: string;
        data: {
            status: string;
            timestamp: string;
        };
        timestamp: string;
    };
}
