export declare class SplasherEditor {
    private layers;
    private maps;
    private sizers;
    private throttledUpdate;
    private availableMaps;
    private availableSizers;
    private mapDescriptions;
    private sizerDescriptions;
    private currentHtml;
    constructor();
    private init;
    private parseHtmlInput;
    addLayer(): void;
    deleteLayer(index: number): void;
    toggleLayerVisibility(index: number): void;
    updateLayerConfigForIndex(index: number): void;
    private renderLayersList;
    private updatePreview;
    private updateHtmlOutput;
    saveHtml(): void;
    loadHtml(): void;
    private showStatus;
}
declare global {
    interface Window {
        editor: SplasherEditor;
    }
}
//# sourceMappingURL=editor.d.ts.map