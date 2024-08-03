<template>
  <div class="container">
    <div class="controls">
      <button @click="toggleLayerVisibility('boundOblLayer')">Toggle Bound Obl Layer</button>
      <button @click="toggleLayerVisibility('fireDataLayer')">Toggle Fire Data Layer</button>
      <button @click="toggleLayerVisibility('fireDepLayer')">Toggle Fire Dep Layer</button>
      <button @click="toggleLayerVisibility('kzLayer')">Toggle KZ Layer</button>
      <button @click="toggleLayerVisibility('riversKzLayer')">Toggle Rivers KZ Layer</button>
    </div>
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script>
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import Zoom from 'ol/control/Zoom';
import Rotate from 'ol/control/Rotate';

import boundOblGeojson from '@/assets/BoundObl.geojson';
import fireDataGeojson from '@/assets/firedata.geojson';
import fireDepGeojson from '@/assets/fireDep.geojson';
import kzGeojson from '@/assets/KZ_1.geojson';
import riversKzGeojson from '@/assets/rivers_kz.geojson';

export default {
  name: 'OpenLayersMap',
  data() {
    return {
      map: null,
      layers: {
        boundOblLayer: null,
        fireDataLayer: null,
        fireDepLayer: null,
        kzLayer: null,
        riversKzLayer: null
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const baseLayer = new TileLayer({
        source: new OSM({
          attributions: [] // Remove default attribution
        })
      });

      const createVectorLayer = (geojsonData, color) => {
        return new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(geojsonData, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: color }),
              stroke: new Stroke({ color: 'white', width: 1 })
            })
          })
        });
      };

      this.layers.boundOblLayer = createVectorLayer(boundOblGeojson, 'red');
      this.layers.fireDataLayer = createVectorLayer(fireDataGeojson, 'green');
      this.layers.fireDepLayer = createVectorLayer(fireDepGeojson, 'blue');
      this.layers.kzLayer = createVectorLayer(kzGeojson, 'yellow');
      this.layers.riversKzLayer = createVectorLayer(riversKzGeojson, 'cyan');

      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [
          baseLayer,
          this.layers.boundOblLayer,
          this.layers.fireDataLayer,
          this.layers.fireDepLayer,
          this.layers.kzLayer,
          this.layers.riversKzLayer
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        }),
        controls: [] // Remove default controls
      });

      // Add custom zoom and rotate controls
      this.map.addControl(new Zoom({ className: 'custom-zoom' }));
      this.map.addControl(new Rotate({ className: 'custom-rotate' }));
    },
    toggleLayerVisibility(layerName) {
      const layer = this.layers[layerName];
      if (layer) {
        const visible = layer.getVisible();
        layer.setVisible(!visible);
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.controls button {
  margin-bottom: 5px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.controls button:hover {
  background: #0056b3;
}

.map {
  flex-grow: 1;
  height: 100%;
}

.custom-zoom,
.custom-rotate {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.custom-zoom button,
.custom-rotate button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  text-align: center;
}

.custom-zoom button:hover,
.custom-rotate button:hover {
  background: rgba(0, 60, 136, 0.2);
}

.custom-rotate {
  top: 60px; /* Adjust position for rotate control */
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .controls {
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    padding: 5px;
  }

  .controls button {
    margin-bottom: 0;
    margin-right: 5px;
  }

  .map {
    height: calc(100vh - 50px);
  }

  .custom-zoom,
  .custom-rotate {
    top: 10px;
    left: calc(50% - 20px); /* Center on small screens */
  }
}
</style>
