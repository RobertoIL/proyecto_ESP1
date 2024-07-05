<template>
    <main ref="contentToExport" class="bg-gray-900 text-slate-200">
        <p class="text-2xl font-bold font-font_tittle text-center p-6">Historial de partidas</p>
        <div class="flex justify-between px-8">
          <button class="flex p-2 items-center justify-center bg-gray-950 rounded-xl hover:bg-gray-800">
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
        <div class="flex flex-col justify-center items-center space-y-4" v-for="(registro, index) in historial" :key="index">
            <div class="flex space-x-4">
                 <!-- Ganador -->
                <div class="">
                    <div class="">{{ registro.jugador1 }}</div>
                </div>
                <p class="font-bold">VS</p>
                <!-- Perdedor -->
                <div>
                    <div class="">{{ registro.jugador2 }}</div>
                </div>
            </div>
            <div class="flex">
                Ganador: {{ registro.ganador }}
            </div>
            <div class="flex">
                Fecha: {{ registro.fecha }}
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default {
  name: "RecordView",
  data() {
    return {
      historial: [],
    };
  },
  mounted() {
    this.cargarHistorial();
  },
  methods: {
    async cargarHistorial() {
      try {
        const response = await axios.get('http://localhost:3000/historial/all');
        this.historial = response.data; 
      } catch (error) {
            console.error("Error al cargar el historial:", error);
      }
    },
    async exportToPDF() {
      const content = this.$refs.contentToExport;
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