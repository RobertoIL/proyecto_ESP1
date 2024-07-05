<template>
    <div class="flex flex-col items-center bg-gray-900">
        <div class="">
            <div class="flex flex-col py-10 space-y-5 w-[600px]">
                <CardCharacter
                v-for="(character, index) in characters"
                :key="index"
                :image="character.image"
                :name="character.name"
                :description="character.description"/>
        </div>
        </div>
    </div>
</template>
<script>
import CardCharacter from "../components/CardCharacter.vue";

export default {
    components: {
        CardCharacter
    },
    data() {
         return {
             characters: [
                {
                 image: '/public/Archer/Archer_Wiki.png', 
                 name: 'Arquero', 
                 description: 'Elimina enemigos a distancia con precisión milimétrica, evade ataques con agilidad felina y se mueve sigilosamente para ataques furtivos.' 
                }, 
                { 
                    image: '/public/Mage/Mage1.png', 
                    name: 'Mago', 
                    description: 'Controla el campo de batalla con ataques elementales, ilusiones y encantamientos, y posee un amplio conocimiento de hechizos.' }, 
                { 
                    image: '/public/Lancer/Lancer_Wiki.png', 
                    name: 'Lancero', 
                    description: 'Guerrero de primera línea que inflige gran daño, defiende con precisión mortal y lidera con lealtad e inspiración.' },
                {
                    image: '/public/Saber/Saber1.png',
                    name: 'Espadachín',
                    description: 'Elimina enemigos rápidamente con ataques letales de katana, se adapta a diferentes estilos de combate con otras armas y evade ataques con movimientos rápidos.'
                },
            ]
        }
    }
}
</script>