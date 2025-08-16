<script>
  export let images = [];
  export let title = '';
  
  let currentIndex = 0;
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  
  function goToImage(index) {
    currentIndex = index;
  }
</script>

<div class="relative w-full">
  <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-teal-50">
    {#if images.length > 0}
      <img 
        src={images[currentIndex].src} 
        alt={images[currentIndex].alt || title}
        class="h-full w-full object-contain"
      />
    {/if}
    
    {#if images.length > 1}
      <!-- Navigation buttons -->
      <button
        on:click={prevImage}
        class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Previous image"
      >
        <svg class="size-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        on:click={nextImage}
        class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Next image"
      >
        <svg class="size-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
  
  {#if images.length > 1}
    <!-- Dots indicator -->
    <div class="mt-4 flex justify-center gap-2">
      {#each images as _, index}
        <button
          on:click={() => goToImage(index)}
          class="size-2 rounded-full transition-all {currentIndex === index ? 'w-8 bg-teal-600' : 'bg-slate-300 hover:bg-slate-400'}"
          aria-label="Go to image {index + 1}"
        />
      {/each}
    </div>
  {/if}
</div>