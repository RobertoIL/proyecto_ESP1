<template>
  <main ref="contentToExport" class="bg-gray-900 text-slate-200">
    <p class="text-2xl font-bold font-font_tittle text-center p-6">Historial de partidas</p>
    <div class="flex justify-between px-8">
      <button @click="limpiarHistorial" class="flex p-2 items-center justify-center bg-gray-950 rounded-xl hover:bg-gray-800">
        <span class="material-symbols-outlined">
          mop
        </span>
        Limpiar historial
      </button>
      <button @click="exportToPDF" class="flex items-center justify-center p-2 rounded-xl bg-slate-700 hover:bg-slate-600">
        <span class="material-symbols-outlined">
          download
        </span>
        Descargar historial
      </button>
    </div>
    <div class="flex flex-col justify-center items-center space-y-4 border-slate-200" v-for="(registro, index) in historial" :key="index">
      <div class="flex space-x-2">
        <div>{{ registro.jugador1 }}</div>
        <p class="font-bold text-lg text-yellow-300">VS</p>
        <div>{{ registro.jugador2 }}</div>
      </div>
      <div class="flex">
        <p class="font-bold px-2">Ganador:</p>
        {{ registro.ganador }}
      </div>
      <div class="flex">
        {{ new Date(registro.fecha).toLocaleString() }}
      </div>
    </div>
  </main>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import historialService from "../services/historialService";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export default {
  name: "RecordView",
  data() {
    return {
      historial: [],
    };
  },
  async mounted() {
    await this.cargarHistorial();
  },
  methods: {
    async cargarHistorial() {
      try {
        const historial = await historialService.getHistorial();
        this.historial = historial;
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    },
    async limpiarHistorial() {
      try {
        const userId = useAuthStore().getUserId;
        await axios.delete(`http://localhost:3000/historial/${userId}`);
        this.historial = [];
      } catch (error) {
        console.error("Error al limpiar historial:", error);
      }
    },
    async exportToPDF() {
      const content = this.$refs.contentToExport;
      if (!content) {
        console.error("Content to export not found.");
        return;
      }
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('historial.pdf');
    }
  }
};
</script>
