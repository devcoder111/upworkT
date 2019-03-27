<template>
    <div class="scratcher-modal-wrap inner-modal">
        <!--{{ current_batch }} == {{ scratcher_type }} {{ scratcher_state }} - {{ current_seq_nbr }} - {{ typeof current_seq_nbr }}-->
        <div class="scratcher-game-info"></div>
        <div v-if="show_menu" class="scratcher-type-picks">
            <div @click="changeScratcherType('CC')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice info scratcher">
                        <img src='../assets/quinto-images/scratcher_images/cc/CCbanner.png'>
                    </div>
                    <div class="game-choice-overlay-modal"></div>
                </div>
            </div>
            <div @click="changeScratcherType('AS')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice-info scratcher"><img
                            src='../assets/quinto-images/scratcher_images/as/ASbanner.png'></div>
                    <div class="game-choice-overlay"></div>
                </div>
            </div>
            <div @click="changeScratcherType('HR')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice-info scratcher"><img
                            src='../assets/quinto-images/scratcher_images/hr/HRbanner.png'></div>
                    <div class="game-choice-overlay"></div>
                </div>
            </div>
            <div @click="changeScratcherType('KB')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice-info scratcher"><img
                            src='../assets/quinto-images/scratcher_images/kb/KBbanner.png'></div>
                    <div class="game-choice-overlay"></div>
                </div>
            </div>
            <div @click="changeScratcherType('SC')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice-info scratcher"><img
                            src='../assets/quinto-images/scratcher_images/sc/SCbanner.png'></div>
                    <div class="game-choice-overlay"></div>
                </div>
            </div>
            <div @click="changeScratcherType('SM')" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice-info scratcher"><img
                            src='../assets/quinto-images/scratcher_images/sm/SMbanner.png'></div>
                    <div class="game-choice-overlay"></div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="scratcher_type != ''" id="js-container" :class="scratcher_type+' scratcherContainer'"
                 :style="'background-position: 0 0; background-repeat: no-repeat; background-size: 100% 100%; background-image: url('+getImageUrl(scratcher_type+'BackgroundBits.png')+');'">
                <div class="scratcherBits">{{ current_batch_cost() }}</div>
                <div :id="scratcher_type+'Scratch'+(cell.cell_nbr+1)"
                     :class="'behindScratcher '+isLonger(cell.cell_text)"
                     v-for="cell in current_scratcher_cells()">{{ cell.cell_text }}
                </div>
                <div class="scratcherMiddleHashTextArea">{{ serial_nbr() }}</div>
                <canvas @click="revealOrNext()" id="js-canvas" :class="'canvas '+scratcher_type+'ScratchArea'" alt="scratcher"
                        :style="canvasStyle()"></canvas>
                <div :id="scratcher_type+'ScratcherPrizeCoverText'" class="scratcherPrize scratcherPrizeText"><a>{{
                    current_scratcher_payout() }}</a></div>
                <div v-if="prizeCoverVisible()" id="ScratcherPrizeCover" class="scratcherPrize scratcherPrizeCover"><img :src="scratcher_prize_image"></div>
            </div>
            <div v-if="scratcher_type != ''" class="scratcher-actions">
                <div :style="isVisible(!current_batch)">
                    Quantity:
                    <select v-model="quantity">
                        <option v-for="number in quantity_list" :value="number">{{ number }}
                        </option>
                    </select>

                    Price:
                    <select v-model="price">
                        <option v-for="number in price_list" :value="number">{{ number }}</option>
                    </select>

                    <button :disabled="purchase_button_disabled" class="primaryButton" @click="purchase()" id="scratcher_purchase" v-html="purchase_text()"></button>
                    <button @click="showMenu" style="float: left;" class="primaryButton">Change Theme</button>
                    <div ></div>
                </div>
                <div v-if="current_batch">
                    <span style="float: left;">Total Won: {{ current_earnings }}</span>
                    {{ current_seq_nbr }} / {{ totalScratchers() }}
                    <button class="scratcher-action primaryButton" v-if="scratcher_state == 'reset'" v-on:click="reveal()"
                            id="scratcher_reveal">
                        Reveal
                    </button>
                    <button class="primaryButton" v-else-if="current_seq_nbr >= totalScratchers()"
                            id="scratcher_submit" :disabled="submit_button_disabled"
                            v-on:click="scratcher_submit()">Submit Winnings
                    </button>
                    <button class="scratcher-action primaryButton" v-else-if="scratcher_state == 'revealed'" id="scratcher_next"
                            v-on:click="next()">Next
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'games-scratcher',
        data: function () {
            return {
                show_menu: false,
                current_seq_nbr: 1,
                price: 1,
                quantity: 1,
                submit_button_disabled: false,
                purchase_button_disabled: false,
                scratcher_type: 'AS',
                scratcher_state: '',
                current_earnings: '0 bits',
                scratcher_cell_image: '',
                scratcher_prize_image: '',
            }
        },
        computed: {
            quantity_list: function () {
                return this.min_max_quantity_to_array();
            },
            price_list: function () {
                return this.min_max_price_to_array();
            },
            scratcher_def: function () {
                if(this.$store.state.scratcher.scratcher_defs) {
                    return this.$store.state.scratcher.scratcher_defs[0];
                } else {
                    return {
                        min_qty: 1,
                        max_qty: 1
                    }
                }
            },
            current_batch: function () {
                return this.$store.getters['scratcher/getBatch'];
            },
        },
        mounted: function () {
            this.boot();
        },
        watch: {
            scratcher_type: function () {
                this.scratcher_cell_image = this.getImageUrl(this.scratcher_type + 'ScratchArea.png');
                this.scratcher_prize_image = this.getImageUrl(this.scratcher_type + 'PrizeArea.png');
                this.$nextTick(function(){
                    this.reset();
                });


                this.$store.dispatch('account/write_local_param', {
                    section: 'scratchers',
                    ident: 'scratcher_type',
                    value: this.scratcher_type
                });
            },
            quantity: function () {
                this.$store.dispatch('account/write_local_param', {
                    section: 'scratchers',
                    ident: 'quantity',
                    value: this.quantity
                });
            },
            price: function () {
                this.$store.dispatch('account/write_local_param', {
                    section: 'scratchers',
                    ident: 'price',
                    value: this.price
                });
            },
            current_seq_nbr: function () {
                this.$store.dispatch('account/write_param', {
                    section: 'scratchers',
                    ident: 'seq_nbr',
                    value: this.current_seq_nbr + ''
                })
            },
            scratcher_state: function () {
                this.$store.dispatch('account/write_local_param', {
                    section: 'scratchers',
                    ident: 'scratcher_state',
                    value: this.scratcher_state
                });
                switch (this.scratcher_state) {
                    case '':
                        //TODO: add a default state and set one for when logging in
                        break;
                    case 'purchased':
                        this.scratcher_state = 'reset';
                        break;
                    case 'nexted':
                        break;
                    case 'reset':
                        break;
                    case 'revealed':
                    case 'done':
                        var canvas = document.getElementById('js-canvas');
                        let ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        break;
                    case 'submitted':
                            break;
                }
            },
            current_batch: function () {
                //TODO: all of this needs to be verified for when resuming a scratcher session
                this.scratcher_state = 'reset';
                this.current_seq_nbr = 1;
                this.current_earnings = '0 bits';
                if (!this.current_batch) {
                    this.reset();
                    this.scratcher_state = '';
                }
            },
        },
        methods: {
            boot: function(){
                //Scratcher State
                if (!this.current_batch) {
                    this.scratcher_state = '';
                }
                this.scratcher_state = this.$store.getters['account/get_user_param']({
                    default_value: this.current_batch ? 'reset' : '',
                    ident: 'scratcher_state',
                    section: 'scratchers'
                });
                
                //Sequence Number
                this.current_seq_nbr = this.$store.getters['account/get_user_param']({
                            ident: 'seq_nbr',
                            section: 'scratchers',
                            default_value: 1
                        }) * 1;
                
                //Current Earnings
                if(this.scratcher_state == 'revealed') {
                    this.current_earnings = current_scratcher().batch_total;
                } else if(this.current_seq_nbr != 1) {
                    this.current_earnings = get_previous_scratcher().batch_total;
                }
                
                this.price = this.$store.getters['account/get_user_param']({
                    ident: 'price',
                    section: 'scratchers',
                    default_value: 1
                });
                this.quantity = this.$store.getters['account/get_user_param']({
                    ident: 'quantity',
                    section: 'scratchers',
                    default_value: '1'
                });
                this.scratcher_type = this.$store.getters['account/get_user_param']({
                    default_value: 'AS',
                    ident: 'scratcher_type',
                    section: 'scratchers'
                })
                this.scratcher_cell_image = this.getImageUrl(this.scratcher_type + 'ScratchArea.png');
                this.scratcher_prize_image = this.getImageUrl(this.scratcher_type + 'PrizeArea.png');
                this.scratch_it(this.getScratcherImage());
            },
            changeScratcherType: function(scratcher_type){
                this.show_menu = false;
                this.scratcher_type = scratcher_type;
            },
            revealOrNext: function() {
                if(this.scratcher_state == 'reset'){
                    this.reveal();
                } else if(this.current_seq_nbr >= this.totalScratchers()) {
                    return;
                } else if(this.scratcher_state == 'revealed'){
                    this.next();
                } else {
                    return;
                }
            },
            purchase_text: function(){
                return 'Purchase <span style="line-height: 20px; font-size: smaller;">('+this.price * this.quantity+' bits)</span>';
            },
            prizeCoverVisible: function(){
                return (this.scratcher_state != 'revealed' && this.scratcher_state != 'done' && this.scratcher_state != 'submitted');
            },
            setScratcherType: function (type) {
                this.scratcher_type = type;
                this.show_menu = false;
            },
            showMenu: function () {
                this.show_menu = true;

            },
            isLonger: function (text) {
                if (text.length > 2) {
                    return 'longer';
                }
            },
            isVisible: function (condition) {
                return condition ? '' : 'visibility: hidden; position: absolute; ';
            },
            min_max_quantity_to_array() {
                return this.min_max_to_array(this.scratcher_def.min_qty, this.scratcher_def.max_qty);
            },
            min_max_price_to_array() {
                return this.min_max_to_array(this.scratcher_def.min_wager, this.scratcher_def.max_wager);
            },
            min_max_to_array(min, max) {
                let array = []
                let inc = 0
                let qty = min;
                while (qty <= max) {
                    array.push('' + qty)
                    while (qty >= Math.pow(10, inc + 1)) inc++
                    qty = qty += Math.pow(10, inc)
                }
                return array
            },
            totalScratchers: function () {
                var self = this;
                if (this.current_batch) {
                    return this.$store.state.scratcher.scratchers.filter(function (scratcher) {
                        return self.current_batch.batch_id == scratcher.batch_id;
                    }).length;
                }
            },
            current_scratcher: function () {
                return this.$store.getters['scratcher/getCurrentScratcher'](this.current_seq_nbr);
            },
            get_previous_scratcher: function(){
                return this.$store.getters['scratcher/getCurrentScratcher'](this.current_seq_nbr - 1)
            },
            current_scratcher_payout: function () {
                if (this.current_scratcher()) {
                    return this.current_scratcher().payout_text;
                }
            },
            serial_nbr: function () {
                if (this.current_scratcher()) {
                    return this.current_scratcher().serial_nbr;
                }
            },
            current_scratcher_cells: function () {
                var self = this;
                if (this.current_scratcher())
                    return this.$store.state.scratcher.scratcher_cells.filter(function (cell) {
                        return cell.seq_nbr == self.current_seq_nbr && cell.batch_id == self.current_scratcher().batch_id;
                    });
            },
            current_batch_cost: function () {
                var self = this;
                if (this.current_batch) {
                    return this.current_batch.cost;
                } else {
                    return this.price;
                }
            },
            getScratcherImage: function () {
                return this.getImageUrl(this.scratcher_type + 'ScratchArea.png');
            },
            getImageUrl: function (filename) {
                return require('../assets/quinto-images/scratcher_images/' + this.scratcher_type.toLowerCase() + '/' + filename)
            },
            purchase: function () {
                if (!this.$store.state.runtime.logged_in) {
                    this.$store.dispatch('dialog_login')
                    return;
                }
                this.purchase_button_disabled = true;
                this.submit_button_disabled = false;
                this.scratcher_state = 'purchased';
                this.$store.dispatch('scratcher/scratcher_purchase', {
                    def_id: this.scratcher_def.def_id,
                    qty: this.quantity,
                    cost: this.price
                });
            },
            reveal: function () {
                var self = this;
                //document.getElementById('ScratcherPrizeCover').style.visibility = 'hidden';

                this.current_earnings = this.current_scratcher().batch_total;
                if (this.$store.state.scratcher.scratchers.find(function (scratcher) {
                            return scratcher.seq_nbr == self.current_seq_nbr + 1;
                        })) {
                    this.scratcher_state = 'revealed';
                } else {
                    this.scratcher_state = 'done';
                }
            },
            next: function () {
                this.scratcher_state = 'nexted';
                this.current_seq_nbr = this.current_seq_nbr + 1;
                this.reset();
            },
            reset: function () {
                this.scratcher_state = 'reset';
                this.scratch_it(this.getScratcherImage());
            },
            scratcher_submit: function () {
                this.purchase_button_disabled = false;
                this.submit_button_disabled = true;
                this.scratcher_state = 'submitted';
                this.$store.dispatch('scratcher/scratcher_submit', {batch_id: this.current_batch.batch_id})
            },
            canvasStyle: function () {
                var style = 'position: absolute; text-align: center; width: 45%; height: 46.9%; font-size: 50px; z-index: 10;'
                switch (this.scratcher_type) {
                    case 'AS':
                        return style += ' top: 23%; left: 26.44%;';
                        break;
                    case 'KB':
                        return style += ' top: 32.7%; left: 37%;';
                        break;
                    case 'HR':
                        return style += ' top: 21.7%; left: 26%;';
                        break;
                    case 'CC':
                        return style += ' top: 25%; left: 52.2%;';
                        break;
                    case 'SC':
                        return style += ' top: 27.4%; left: 26.9%;';
                        break;
                    case 'SM':
                        return style += ' top: 36%; left: 49.7%;';
                        break;
                }
            },
            scratch_it: function (src='') {
                var self = this;
                var isDrawing;
                var lastPoint;
                var canvas = document.getElementById('js-canvas')
                if (!canvas) {
                    //alert('no canvas')
                    console.log('no canvas aborting');
                    return
                }
                console.log('we have a canvas');
                var ctx = canvas.getContext('2d');
                var image = new Image();
                var brush = new Image();

                if (src) {
                    image.src = src
                } else {
                    console.log('using default image')
                    image.src = '/static/img/HRbanner.f4f4791.png'
                }
                image.onload = function () {
                    ctx.globalCompositeOperation = "source-over";
                    ctx.drawImage(image, 0, 0, 300, 150)
                    // Show the form when Image is loaded.
                };
                brush.src = 'data:image/png;base64,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';

                canvas.addEventListener('mousedown', handleMouseDown, false);
                canvas.addEventListener('mouseover', handleMouseDown, false);
                //TODO: can add mouseout to reduce processing... seems ok so far
                canvas.addEventListener('touchstart', handleMouseDown, false);
                canvas.addEventListener('mousemove', handleMouseMove, false);
                canvas.addEventListener('touchmove', handleMouseMove, false);
                canvas.addEventListener('mouseup', handleMouseUp, false);
                canvas.addEventListener('touchend', handleMouseUp, false);

                function distanceBetween(point1, point2) {
                    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
                }

                function angleBetween(point1, point2) {
                    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
                }

                // Only test every `stride` pixel. `stride`x faster,
                // but might lead to inaccuracy
                function getFilledInPixels(stride) {
                    if (!stride || stride < 1) {
                        stride = 1;
                    }

                    var pixels = ctx.getImageData(0, 0, 300, 150)
                    if (!pixels) {
                        return
                    }
                    var pdata = pixels.data
                    var l = pdata.length
                    var total = (l / stride)
                    var count = 0

                    // Iterate over all pixels
                    for (var i = count = 0; i < l; i += stride) {
                        if (parseInt(pdata[i]) === 0) {
                            count++;
                        }
                    }

                    return Math.round((count / total) * 100);
                }

                function getMouse(e, canvas) {
                    var offsetX = 0, offsetY = 0, mx, my;
                    if (canvas.offsetParent !== undefined) {
                        var canvas_count = 0
                        do {
                            offsetX += canvas.offsetLeft;
                            offsetY += canvas.offsetTop;
                        } while ((canvas = canvas.offsetParent));
                    }
                    mx = (e.pageX || e.touches[0].clientX) - offsetX;
                    my = (e.pageY || e.touches[0].clientY) - offsetY - window.pageYOffset;

                    return {x: mx, y: my};
                }

                function handlePercentage(filledInPixels) {
                    filledInPixels = filledInPixels || 0;
                    //console.log(filledInPixels + '%');
                    if (filledInPixels > 85) {
                        self.reveal();
                    }
                }

                function handleMouseDown(e) {
                    if (self.scratcher_state == 'reset') {
                        isDrawing = true;
                    }
                    lastPoint = getMouse(e, canvas);
                    //console.log(JSON.stringify(lastPoint))
                }

                function handleMouseMove(e) {
                    if (self.scratcher_state != 'reset' || !self.current_batch) {
                        return;
                    }
                    e.preventDefault();

                    var currentPoint = getMouse(e, canvas),
                            dist = distanceBetween(lastPoint, currentPoint),
                            angle = angleBetween(lastPoint, currentPoint),
                            x, y;

                    //console.log(JSON.stringify(currentPoint))
                    for (var i = 0; i < dist; i++) {
                        x = lastPoint.x + (Math.sin(angle) * i) - 25;
                        y = lastPoint.y + (Math.cos(angle) * i) - 25;
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.drawImage(brush, x, y);
                    }

                    lastPoint = currentPoint;
                    handlePercentage(getFilledInPixels(32));
                }

                function handleMouseUp(e) {
                    isDrawing = false;
                }

            }
        },
    }


</script>

<style scoped>

    .scratcher-action {
        width: 80px;
        display: inline-block;
        margin-left: 5px;
    }

    #js-container {
        margin: 30px auto 10px auto;
    }

    .scratcher-actions div {
        text-align: right;

    }

    .scratcher-actions {
        width: 600px;
        margin: 0 auto;
    }

    #js-canvas {
        width: 45%;
        height: 46.9%;
    }

    .scratcher_ticket {
        text-align: center;
        visibility: hidden;
        width: 600px;
        height: 300px;
        z-index: 900;
    }

    .xontainer {
        border: 3px solid yellow;
        position: relative;
        width: 600px;
        height: 300px;
        margin: 0 auto;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .form {
        padding: 20px;
    }

    .scratcherContainer {
        width: 600px; /* Set Scratcher Size Here */
        height: 400px; /*  The rest will adjust.  */
        /* Except font size and line height */
        position: relative;
        z-index: 1;
        font-size: 14px;
        line-height: 20px;
    }

    .scratcherBits {
        position: absolute;
        text-align: center;
        width: 8.88%;
        color: #000;
        height: 10%;
        top: 2.6%;
        left: 6%;
        line-height: 36px;
        font-size: 20px;
        z-index: 10;
    }

    .behindScratcher {
        position: absolute;
        text-align: center;
        width: 12%;
        height: 18%;
        line-height: 2.55em;
        font-size: 2em;
        /*            border: solid 1px #e31837; */
        z-index: 10;
        border-radius: 200px;
        display: table;
        color: #fff;
    }

    .behindScratcher.longer {
        line-height: 3em;
        font-size: 1.7em;
    }

    .scratcherNumber {
        vertical-align: middle;
        display: table-cell;
    }

    .scratcherNumber div {
        vertical-align: middle;
        display: table-cell;
    }

    .scratcherContainer img {
        width: 100%;
        height: auto;
        vertical-align: top;
    }

    .scratchArea {
        position: absolute;
        text-align: center;
        width: 45%;
        height: 46.9%;
        font-size: 50px;
        z-index: 10;
        opacity: .15;
    }

    .scratcherPrize {
        position: absolute;
        text-align: center;
        width: 44.88%;
        height: 10.83%;
        line-height: 40px;
        font-size: 30px;
        /* opacity: .5; */
    }

    .scratcherPrize a {
        text-align: center;
        display: block;
        text-decoration: none;
        color: #fff;
    }

    .scratcherMiddleHashTextArea {
        position: absolute;
        z-index: 10;
        font-size: 12px;
    }

    .AS .scratcherMiddleHashTextArea {
        top: 43.5%;
        left: 32.5%;
    }

    #ASScratch1 {
        top: 26%;
        left: 28.2%;
    }

    #ASScratch2 {
        top: 26%;
        left: 42.7%;
    }

    #ASScratch3 {
        top: 26%;
        left: 57.4%;
    }

    #ASScratch4 {
        top: 48.4%;
        left: 28.2%;
    }

    #ASScratch5 {
        top: 48.4%;
        left: 42.7%;
    }

    #ASScratch6 {
        top: 48.5%;
        left: 57.4%;
    }

    #ASScratchArea {
        top: 23%;
        left: 26.44%;
    }

    .AS #ScratcherPrizeCover {
        top: 75%;
        left: 26.55%;
        z-index: 10;

        /* opacity: .2; */
    }

    #ASScratcherPrizeCoverText {
        top: 75%;
        left: 26.55%;
        z-index: 5;
    }

    /* START Hot Rod Scrtacher */

    .HR .scratcherMiddleHashTextArea {
        top: 42.6%;
        left: 31.7%;
    }

    #HRScratch1 {
        top: 24.8%;
        left: 27.6%;
    }

    #HRScratch2 {
        top: 24.8%;
        left: 42.1%;
    }

    #HRScratch3 {
        top: 24.8%;
        left: 56.7%;
    }

    #HRScratch4 {
        top: 47.5%;
        left: 27.6%;
    }

    #HRScratch5 {
        top: 47.5%;
        left: 42.1%;
    }

    #HRScratch6 {
        top: 47.5%;
        left: 56.7%;
    }

    #HRScratchArea {
        top: 21.7%;
        left: 26%;
    }

    .HR #ScratcherPrizeCover {
        top: 70.4%;
        left: 26%;
        z-index: 10;
        /* opacity: .2; */
    }

    #HRScratcherPrizeCoverText {
        top: 70.4%;
        left: 26%;
        z-index: 5;
    }

    /* End Hot Rod
       START Kissing Booth  */

    .KB .scratcherMiddleHashTextArea {
        top: 54%;
        left: 44%;
    }

    .KB .behindScratcher {
        line-height: 3em;
        font-size: 1.8em;
    }

    .KB .behindScratcher.longer {
        line-height: 3.4em;
        font-size: 1.5em;
    }

    #KBScratch1 {
        top: 35%;
        left: 39%;
    }

    #KBScratch2 {
        top: 35%;
        left: 53.4%;
    }

    #KBScratch3 {
        top: 35%;
        left: 68.3%;
    }

    #KBScratch4 {
        top: 57%;
        left: 39%;
    }

    #KBScratch5 {
        top: 57%;
        left: 53.4%;
    }

    #KBScratch6 {
        top: 57%;
        left: 68.3%;
    }

    #KBScratchArea {
        top: 32.7%;
        left: 37%;
    }

    .KB #ScratcherPrizeCover {
        top: 84.5%;
        left: 36.8%;
        z-index: 10;
        /* opacity: .2; */
    }

    #KBScratcherPrizeCoverText {
        top: 84.5%;
        left: 36.8%;
        z-index: 5;
    }

    /* END kissing booth
      START Scratch Magic */

    .SM .scratcherMiddleHashTextArea {
        top: 56.4%;
        left: 56%;
        font-size: 12px;
    }
/*
    .SM .behindScratcher {
        line-height: 3.3em;
        font-size: 1.8em;
    }

    .SM .behindScratcher.longer {
        line-height: 4.4em;
        font-size: 1.4em;
    }  */

    #SMScratch1 {
        top: 39.2%;
        left: 51.4%;
    }

    #SMScratch2 {
        top: 39.2%;
        left: 65.6%;
    }

    #SMScratch3 {
        top: 39.2%;
        left: 80.6%;
    }

    #SMScratch4 {
        top: 62%;
        left: 51.4%;
    }

    #SMScratch5 {
        top: 62%;
        left: 65.6%;
    }

    #SMScratch6 {
        top: 62%;
        left: 80.6%;
    }

    .SM #ScratcherPrizeCover {
        top: 84.5%;
        left: 49.7%;
        z-index: 10;
        /* opacity: .2; */
    }

    #SMScratcherPrizeCoverText {
        top: 84.5%;
        left: 49.7%;
        z-index: 5;
    }

    #SMScratchArea {
        top: 36%;
        left: 49.7%;
    }

    /* END Scratch Magic
      START Sin City */

    .SC .scratcherMiddleHashTextArea {
        top: 48.2%;
        left: 33%;
    }

    /* These ones are adjusted manually by increasing the "top" by 1% for an unknown reason -RH*/
    #SCScratch1 {
        top: 30.3%;
        left: 28.6%;
    }

    #SCScratch2 {
        top: 30.3%;
        left: 43.2%;
    }

    #SCScratch3 {
        top: 30.3%;
        left: 57.8%;
    }

    #SCScratch4 {
        top: 52.8%;
        left: 28.6%;
    }

    #SCScratch5 {
        top: 52.8%;
        left: 43.2%;
    }

    #SCScratch6 {
        top: 52.8%;
        left: 57.8%;
    }

    .SC #ScratcherPrizeCover {
        top: 78.4%;
        left: 26.9%;
        z-index: 10;
        /* opacity: .2; */
    }

    #SCScratcherPrizeCoverText {
        top: 78.4%;
        left: 26.9%;
        z-index: 5;
    }

    /* END Sin City
      START Cash Cow */

    .CC .scratcherMiddleHashTextArea {
        top: 46%;
        left: 58.5%;
    }

    /* These ones are adjusted manually by increasing the "top" by 1% for an unknown reason -RH*/
    #CCScratch1 {
        top: 28.1%;
        left: 54.1%;
    }

    #CCScratch2 {
        top: 28.1%;
        left: 68.7%;
    }

    #CCScratch3 {
        top: 28.1%;
        left: 83.3%;
    }

    #CCScratch4 {
        top: 50.7%;
        left: 54.1%;
    }

    #CCScratch5 {
        top: 50.7%;
        left: 68.7%;
    }

    #CCScratch6 {
        top: 50.7%;
        left: 83.3%;
    }

    #CCScratchArea {
        top: 25%;
        left: 52.2%;
    }

    .CC #ScratcherPrizeCover {
        top: 78%;
        left: 52.34%;
        z-index: 10;
        /* opacity: .2; */
    }

    #CCScratcherPrizeCoverText {
        top: 78%;
        left: 52.34%;
        z-index: 5;
    }

    .scratcher-type-picks > div {
        border: solid black 2px;
    }
    
    .scratcher-type-picks > div:hover {
        border: red solid 2px;
    }
    
    button:disabled {
        /*color: red;*/
    }

    /* END Cash Cow  */
</style>

