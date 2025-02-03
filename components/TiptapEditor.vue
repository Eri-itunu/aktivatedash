<template>
  <div class="border">
    <div v-if="editor">


      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button>

    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup>
const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [TiptapStarterKit,TiptapBulletList,
  TiptapOrderedList,
  TiptapListItem,BulletList,
    OrderedList,
    ListItem,],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>
