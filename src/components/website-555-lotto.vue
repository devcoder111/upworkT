<!-- This page is for Lottery -->
<template>
    <div>
        <div class="col grid_8">
            <div class="gm-landing-page-info-wrap">
                <h1 class="gm-landing-info-title">5:55 Lotto</h1>
                <div class="gm-info-general">
                    <p>Welcome to 5:55 LOTTO - Absolutely the best lottery odds out there.</p>
                    
                    <p>A player picks five lucky numbers from 1 to 55, Or, play randomly generated numbers with Quick Pick.</p>
                    
                    <p>Once you have completed all your pick selections (either Quick Pick, Selections, or both), you can now submit them for purchase where they will be recorded, and returned as a ticket with all your picks for the next (or multiple) drawing(s).</p> 
                    
                    <p>The object to 5:55 LOTTO is match your pick(s) with the Game Draw.  Prizes are based on how many matching numbers, and matching all five numbers wins the jackpot.  5:55 LOTTO offers the best odds on winning by paying one matching number or higher, and all payouts are Pari-Mutuel.</p>
                    
                    <p>Pari-Mutuel payouts vary, based on winning combinations and accumulated funds for a specific winning combination. Each winning combination accumulates funds in a separate pool until won.  Actual payout of pool is comprised of 90% of accumulated funds divided by the number of winners, with a 10% carryover.'</p> 
                    
                    <p>All picks in a drawing are automatically validated and paid based on their winning combinations, if any. A single pick is eligible to win one prize amount only.  To determine a winning combination and payout, simply count the number of matching numbers on a pick to the Game Draw.  The jackpot is won by matching all five numbers.  The overall odds of winning a prize in 5:55 Lottery are approximately 1 in 2.56.</p>
                    
                    <p>Drawing are held at 05:55 UTC everyday.  Ticket sales are cut-off 5 seconds prior to drawing, and resumes after all calculation '+
                    and winnings are posted.';</p>
                    
                    <p><strong>Provably Fair</strong></p>
                    
                    <p>The draw hash is the transaction id received at the time of drawing when we move lottery funds to our cold wallet.  This unique   transaction id with timestamp can be verified on the Bitcoin block chain.'</p> 
                    
                    <p>We use the following formula to find the 5:55 LOTTO numbers (working right to left on the draw hash):</p>
                    <ul>
                    <li>take next 4 digits from hash and convert to a decimal value</li>
                    <li>then modulus by 55 and add 1</li>
                    <li>repeat until you get 5 unique numbers</li>
                    </ul>
                    <p>Example:  Draw Hash: 813e 640f 0f19 70ef 0c40 ebb7 ccd2 69d2 4984 5bfd 79e8 1a70 1957 9667 c231 06f3
                              Would result in a drawing of: 20, 49, 4, 53, 24  or sorted to 4, 20, 24, 49, 53</p> 
                    
                    <p>' HEX #9 +'Value #9 +'(mod 55 + 1)  #13#10#13#10 +
                    '06F3 #9 +' 1779 #9#9 +'20  #13#10 +
                    'C231 #9 +'49713 #9#9 +'49  #13#10 +
                    '9667 #9 +'38503 #9#9 +' 4  #13#10 +
                    '1957 #9 +' 6487 #9#9 +'53  #13#10 +
                    '1A70 #9 +' 6768 #9#9 +' 4 (skip - duplicate)  #13#10 +
                    '79E8 #9 +'31208 #9#9 +'24';
                    </p>
                </div>
            </div>
        </div>
        <div class="grid_4">
            <div class="gm-landing-page-info-wrap right-column">
                <div class="gm-img-btn">
                    <div class="playnow"><h2 @click="showModal">Play Now!</h2></div>
                    <span @click="showModal('game-lottery-'+game.ref_id, $event)"><img src='../assets/quinto-images/graphics-1/555.png'></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            game: function(){
                return this.$store.getters['lottery/get555'];
            }  
        },
        methods: {
            showModal: function(view){
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
