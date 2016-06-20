<template>
    <div :class="{'vtable-splitter': true, 'vtable-dragging-splitter': dragging }" :style="style" @mousedown="onMouseDown"></div>
</template>

<script type="text/javascript">
    import Vue from "vue";
    export default Vue.extend({
        props: {
            index: { type: Number, require: true },
            dragging: { type: Boolean, require: true },
            width: { type: Number, default: 2 },
            callback: { type: Function, require: true },
            columnMinWidth: { type: Number, default: 1 }
        },
        computed: {
            style() {
                const w = `${this.width}px`;
                return {
                    minWidth: w,
                    maxWidth: w,
                    height: "100%",
                    cursor: "col-resize"
                };
            }
        },
        methods: {
            onMouseDown(event) {
                const startWidth = event.target.previousElementSibling.clientWidth;
                const startX = event.screenX;
                const onMouseMove = e => {
                    const offset = e.screenX - startX;
                    const width = Math.max(startWidth + offset, this.columnMinWidth);
                    this.callback(this.index, width);
                };
                const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                    this.callback(-1, 0);
                };
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
                this.callback(this.index, startWidth);
            }
        }
    });
</script>
