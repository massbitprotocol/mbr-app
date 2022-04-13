<template>
  <div class="mb-3 w-96 h-[42px]">
    <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
      <input
        type="search"
        class="form-control h-[42px] relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-primary-background rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <button
        class="btn inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-primary/90 hover:shadow-lg focus:bg-primary/90 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out items-center"
        type="button"
        id="button-addon2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSearchWithIcon',
};
</script>
