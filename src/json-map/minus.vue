<template>
    <div style="width:30px; height:30px; border: 1px dashed rgba(244, 67, 54,1); border-radius: 3px; display: flex;cursor: pointer" ref="container"
         @mouseover.stop="$refs['container'].style.boxShadow='0 0 5px 0 rgba(244, 67, 54,0.7)'"
         @mouseout.stop="$refs['container'].style.boxShadow=''">
        <div style="margin: auto">
            <div style="color: #BDBDBD;user-select: none">-</div>
        </div>
    </div>
</template>
