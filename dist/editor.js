import * as libModule from './lib.js';
import * as fillersModule from './fillers.js';
import * as mapsModule from './maps.js';
import * as sizersModule from './sizers.js';
export class SplasherEditor {
    layers = [];
    maps;
    sizers;
    throttledUpdate;
    availableMaps;
    availableSizers;
    mapDescriptions;
    sizerDescriptions;
    currentHtml = '';
    constructor() {
        this.maps = libModule;
        this.sizers = libModule;
        this.availableMaps = Object.keys(mapsModule).filter(key => typeof mapsModule[key] === 'function');
        this.availableSizers = Object.keys(sizersModule).filter(key => typeof sizersModule[key] === 'function');
        const throttle = (func, delay) => {
            let timeoutId = null;
            let lastRunTime = 0;
            return () => {
                const now = Date.now();
                const timeSinceLastRun = now - lastRunTime;
                if (timeoutId)
                    clearTimeout(timeoutId);
                if (timeSinceLastRun >= delay) {
                    lastRunTime = now;
                    func();
                }
                else {
                    timeoutId = window.setTimeout(() => {
                        lastRunTime = Date.now();
                        func();
                    }, delay - timeSinceLastRun);
                }
            };
        };
        this.throttledUpdate = throttle(() => this.updatePreview(), 1000);
        this.mapDescriptions = {};
        this.availableMaps.forEach(map => {
            this.mapDescriptions[map] = `Map: ${map}`;
        });
        this.sizerDescriptions = {};
        this.availableSizers.forEach(sizer => {
            this.sizerDescriptions[sizer] = `Sizer: ${sizer}`;
        });
        this.init();
    }
    init() {
        document.getElementById('canvasWidth')?.addEventListener('input', () => this.throttledUpdate());
        document.getElementById('canvasHeight')?.addEventListener('input', () => this.throttledUpdate());
        document.getElementById('pixelSize')?.addEventListener('input', () => this.throttledUpdate());
        document.getElementById('globalColors')?.addEventListener('input', () => {
            this.throttledUpdate();
        });
        document.getElementById('repeatMs')?.addEventListener('input', () => this.updateHtmlOutput());
        this.addLayer();
    }
    parseHtmlInput() {
        try {
            const html = this.currentHtml;
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const canvas = doc.querySelector('canvas');
            if (!canvas)
                return;
            let width = canvas.getAttribute('width');
            let height = canvas.getAttribute('height');
            const pixelSize = canvas.getAttribute('data-pixel');
            const colors = canvas.getAttribute('data-colors');
            const repeat = canvas.getAttribute('data-repeat');
            if (width && width.endsWith('px'))
                width = width.slice(0, -2);
            if (height && height.endsWith('px'))
                height = height.slice(0, -2);
            if (width)
                document.getElementById('canvasWidth').value = width;
            if (height)
                document.getElementById('canvasHeight').value = height;
            if (pixelSize)
                document.getElementById('pixelSize').value = pixelSize;
            if (colors)
                document.getElementById('globalColors').value = colors;
            if (repeat)
                document.getElementById('repeatMs').value = repeat;
            this.layers = [];
            const layerElements = canvas.querySelectorAll('splasher, plasher');
            layerElements.forEach(el => {
                this.layers.push({
                    id: Date.now() + Math.random(),
                    visible: true,
                    fillerType: el.tagName.toLowerCase(),
                    mapType: el.getAttribute('data-map') || 'diagonals',
                    mapParams: el.getAttribute('data-params') || '10000',
                    sizerType: el.getAttribute('data-size') || 'intensoReversed',
                    sizeParams: el.getAttribute('data-size-params') || '50',
                    layerColors: el.getAttribute('data-colors') || ''
                });
            });
            if (this.layers.length === 0) {
                this.addLayer();
            }
            this.renderLayersList();
            this.throttledUpdate();
        }
        catch (e) {
            console.warn('Failed to parse HTML:', e);
        }
    }
    addLayer() {
        const newLayer = {
            id: Date.now(),
            visible: true,
            fillerType: 'splasher',
            mapType: 'diagonals',
            mapParams: '10000',
            sizerType: 'intensoReversed',
            sizeParams: '50',
            layerColors: ''
        };
        this.layers.push(newLayer);
        this.renderLayersList();
        this.throttledUpdate();
    }
    deleteLayer(index) {
        if (this.layers.length <= 1) {
            this.showStatus('Cannot delete the last layer', 'error');
            return;
        }
        this.layers.splice(index, 1);
        this.renderLayersList();
        this.throttledUpdate();
    }
    toggleLayerVisibility(index) {
        this.layers[index].visible = !this.layers[index].visible;
        this.renderLayersList();
        this.throttledUpdate();
    }
    updateLayerConfigForIndex(index) {
        const layer = this.layers[index];
        layer.fillerType = document.getElementById(`fillerType_${index}`).value;
        layer.mapType = document.getElementById(`mapType_${index}`).value;
        layer.mapParams = document.getElementById(`mapParams_${index}`).value;
        layer.sizerType = document.getElementById(`sizerType_${index}`).value;
        layer.sizeParams = document.getElementById(`sizeParams_${index}`).value;
        layer.layerColors = document.getElementById(`layerColors_${index}`).value;
        const mapParamsValue = document.getElementById(`mapParamsValue_${index}`);
        if (mapParamsValue)
            mapParamsValue.textContent = layer.mapParams;
        const sizeParamsValue = document.getElementById(`sizeParamsValue_${index}`);
        if (sizeParamsValue)
            sizeParamsValue.textContent = layer.sizeParams;
        this.throttledUpdate();
    }
    renderLayersList() {
        const list = document.getElementById('layersList');
        if (!list)
            return;
        list.innerHTML = '';
        this.layers.forEach((layer, index) => {
            const item = document.createElement('div');
            item.className = 'layer-item';
            const mapDesc = this.mapDescriptions[layer.mapType] || '';
            const sizerDesc = this.sizerDescriptions[layer.sizerType] || '';
            item.innerHTML = `
                <div class="layer-item-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" id="visibility_${index}" ${layer.visible ? 'checked' : ''} onchange="window.editor.toggleLayerVisibility(${index})" style="cursor: pointer; margin: 0;">
                        <span class="layer-item-name">Layer ${index + 1}</span>
                    </div>
                    <button class="layer-item-delete" onclick="window.editor.deleteLayer(${index})">Delete</button>
                </div>
                <div class="layer-item-config">
                    <div class="form-group-row">
                        <label>Type</label>
                        <div class="form-group-row-controls">
                            <select id="fillerType_${index}" onchange="window.editor.updateLayerConfigForIndex(${index})" style="flex: 1;">
                                <option value="splasher" ${layer.fillerType === 'splasher' ? 'selected' : ''}>Splasher</option>
                                <option value="plasher" ${layer.fillerType === 'plasher' ? 'selected' : ''}>Plasher</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group-row">
                        <label>Map</label>
                        <div class="form-group-row-controls">
                            <select id="mapType_${index}" onchange="window.editor.updateLayerConfigForIndex(${index})">
                                <option value="">Select...</option>
                                ${this.availableMaps.map(m => `<option value="${m}" ${layer.mapType === m ? 'selected' : ''}>${m}</option>`).join('')}
                            </select>
                            <input type="range" id="mapParams_${index}" min="1" max="200" value="${layer.mapParams}" oninput="window.editor.updateLayerConfigForIndex(${index})">
                            <div class="slider-value"><span id="mapParamsValue_${index}">${layer.mapParams}</span></div>
                        </div>
                    </div>
                    <div class="info-text">${mapDesc}</div>

                    <div class="form-group-row">
                        <label>Sizer</label>
                        <div class="form-group-row-controls">
                            <select id="sizerType_${index}" onchange="window.editor.updateLayerConfigForIndex(${index})">
                                <option value="">Select...</option>
                                ${this.availableSizers.map(s => `<option value="${s}" ${layer.sizerType === s ? 'selected' : ''}>${s}</option>`).join('')}
                            </select>
                            <input type="range" id="sizeParams_${index}" min="1" max="200" value="${layer.sizeParams}" oninput="window.editor.updateLayerConfigForIndex(${index})">
                            <div class="slider-value"><span id="sizeParamsValue_${index}">${layer.sizeParams}</span></div>
                        </div>
                    </div>
                    <div class="info-text">${sizerDesc}</div>

                    <div class="form-group">
                        <label style="font-size: 11px;">Colors (optional)</label>
                        <input type="text" id="layerColors_${index}" placeholder="e.g., red,blue" value="${layer.layerColors}" onchange="window.editor.updateLayerConfigForIndex(${index})">
                    </div>
                </div>
            `;
            list.appendChild(item);
        });
    }
    updatePreview() {
        const canvas = document.getElementById('previewCanvas');
        const canvasWidth = parseInt(document.getElementById('canvasWidth').value);
        const canvasHeight = parseInt(document.getElementById('canvasHeight').value);
        const pixelSize = parseInt(document.getElementById('pixelSize').value);
        const colors = document.getElementById('globalColors').value;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const config = {
            width: Math.floor(canvasWidth / pixelSize),
            height: Math.floor(canvasHeight / pixelSize),
            pixelSize: 1,
            colors: colors,
            x: 0,
            y: 0
        };
        const errors = [];
        try {
            const { init } = libModule;
            let grid = init(config)();
            this.layers.forEach((layer, layerIndex) => {
                if (!layer.visible)
                    return;
                const mockElement = {
                    dataset: {
                        map: layer.mapType,
                        params: layer.mapParams,
                        size: layer.sizerType,
                        sizeParams: layer.sizeParams,
                        colors: layer.layerColors
                    },
                    getAttribute: () => null
                };
                try {
                    const fillerFunc = layer.fillerType === 'plasher' ? fillersModule.plasher : fillersModule.splasher;
                    grid = fillerFunc(mockElement, config, grid);
                }
                catch (e) {
                    errors.push(`Layer ${layerIndex + 1}: ${e.message}`);
                    console.warn('Layer render error:', e);
                }
            });
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                grid.forEach((row, x) => {
                    row.forEach((color, y) => {
                        if (color) {
                            const canvasX = x * pixelSize;
                            const canvasY = y * pixelSize;
                            context.fillStyle = color;
                            context.fillRect(canvasX, canvasY, pixelSize, pixelSize);
                        }
                    });
                });
            }
            if (errors.length > 0) {
                this.showStatus(`Preview rendered with errors: ${errors.join(' | ')}`, 'error');
            }
            else {
                this.showStatus('Preview rendered', 'success');
            }
        }
        catch (e) {
            this.showStatus('Critical error: ' + e.message, 'error');
            console.error(e);
        }
        this.updateHtmlOutput();
    }
    updateHtmlOutput() {
        const width = document.getElementById('canvasWidth').value;
        const height = document.getElementById('canvasHeight').value;
        const pixelSize = document.getElementById('pixelSize').value;
        const colors = document.getElementById('globalColors').value;
        const repeat = document.getElementById('repeatMs').value;
        let html = `<script type="module" src="https://abuseofnotation.github.io/splasher/dist/index.js"><\/script>\n\n`;
        html += `<canvas class="art" width="${width}px" height="${height}px" data-pixel="${pixelSize}" data-colors="${colors}"`;
        if (parseInt(repeat) > 0) {
            html += ` data-repeat="${repeat}"`;
        }
        html += '>\n';
        this.layers.forEach(layer => {
            if (!layer.visible)
                return;
            const tag = layer.fillerType === 'plasher' ? 'plasher' : 'splasher';
            html += `    <${tag} data-map="${layer.mapType}" data-params="${layer.mapParams}" data-size="${layer.sizerType}" data-size-params="${layer.sizeParams}"`;
            if (layer.layerColors) {
                html += ` data-colors="${layer.layerColors}"`;
            }
            html += `></${tag}>\n`;
        });
        html += '</canvas>';
        this.currentHtml = html;
    }
    saveHtml() {
        const blob = new Blob([this.currentHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'splasher.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showStatus('HTML downloaded', 'success');
    }
    loadHtml() {
        const fileInput = document.getElementById('fileInput');
        if (!fileInput)
            return;
        fileInput.onchange = (e) => {
            const target = e.target;
            const file = target.files?.[0];
            if (!file)
                return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result;
                this.currentHtml = content;
                this.parseHtmlInput();
                this.showStatus('HTML loaded', 'success');
            };
            reader.onerror = () => {
                this.showStatus('Failed to read file', 'error');
            };
            reader.readAsText(file);
        };
        fileInput.click();
    }
    showStatus(message, type) {
        const statusDiv = document.getElementById('statusMessage');
        if (!statusDiv)
            return;
        statusDiv.textContent = message;
        statusDiv.className = `status-message status-${type}`;
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = '';
            }, 3000);
        }
    }
}
window.editor = new SplasherEditor();
//# sourceMappingURL=editor.js.map