// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document.createElement
const mockLink = {
    href: '',
    download: '',
    click: jest.fn(),
} as Partial<HTMLAnchorElement>;
global.document.createElement = jest.fn((tagName: string) => {
    if (tagName === 'a') return mockLink as HTMLAnchorElement;
    return {} as HTMLElement;
});

// Mock Blob
global.Blob = class MockBlob extends Blob {
    constructor(blobParts?: BlobPart[], options?: BlobPropertyBag) {
        super(blobParts || [], options);
    }
    get size() {
        return 0;
    }
    get type() {
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    arrayBuffer = () => Promise.resolve(new ArrayBuffer(0));
    slice = () => new MockBlob([]);
    text = () => Promise.resolve('');
};
