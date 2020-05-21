<template>
  <div id="map" class="map"></div>
</template>


<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import "../../node_modules/ol/ol.css";
import Map from "../../node_modules/ol/Map";
import View from "../../node_modules/ol/View";
import TileLayer from "../../node_modules/ol/layer/Tile";
import WMTS from "../../node_modules/ol/source/WMTS";
import WMTSTileGrid from "../../node_modules/ol/tilegrid/WMTS";
import { fromLonLat } from "../../node_modules/ol/proj";
import { getWidth, getTopLeft } from "../../node_modules/ol/extent";
import { get as getProjection } from "../../node_modules/ol/proj";
import { defaults } from "../../node_modules/ol/control";

@Component
export default class MapViewer extends Vue {
  @Prop() msg;

  mounted() {
    this.cargaMapa();
  }

  // component method
  cargaMapa() {
    const projection = getProjection("EPSG:3857");
    const tileSizePixels = 256;
    const tileSizeMtrs = getWidth(projection.getExtent()) / tileSizePixels;
    const matrixIds = [];
    const resolutions = [];
    for (let i = 0; i <= 14; i++) {
      matrixIds[i] = i;
      resolutions[i] = tileSizeMtrs / Math.pow(2, i);
    }
    const tileGrid = new WMTSTileGrid({
      origin: getTopLeft(projection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new WMTS({
            url: "http://www.ign.es/wmts/mapa-raster",
            layer: "MTN",
            format: "image/jpeg",
            matrixSet: "GoogleMapsCompatible",
            tileGrid: tileGrid,
            style: "default"
          })
        })
      ],
      view: new View({
        center: fromLonLat([-3.5, 40.5]),
        zoom: 5
      }),
      controls: defaults({
        attribution: false,
        zoom: false
      })
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 100%;
  background-color: grey;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
}
canvas {
  height: 100%;
}
</style>
