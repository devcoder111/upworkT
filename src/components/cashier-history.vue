<template>
    <div class="home my-deposit inner-modal">
        <account-nav></account-nav>
        <div id="account-content">
            <h2>Transaction history</h2>
            <table cellspacing="1" cellpadding="1" border="1" class="stripeRows">
                <tr>
                    <th>Column 1 </th>
                    <th>Column 2</th>
                    <th>Numerical Amount</th>
                    <th>Words</th>
                </tr>
                <tr>
                    <td>0 - 0</td>
                    <td>623</td>
                    <td>7372</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>u343</td>
                    <td>6123</td>
                    <td>73572</td>
                    <td>Possibly</td>
                </tr>
                <tr>
                    <td>t4545</td>
                    <td>11623</td>
                    <td>7a2</td>
                    <td>Zebra</td>
                </tr>
                <tr>
                    <td>0553</td>
                    <td>u888</td>
                    <td>aa17372</td>
                    <td>Tornado</td>
                </tr>
            </table>
            <ul>
              <li v-for="transaction in this.$store.state.account.bitcoin_transactions">
                {{ show_time(transaction.time_since) }}
                {{ transaction.txn_type }}
                {{ transaction.address }}
                {{ transaction.amount_text }}
                {{ transaction.status }}
              </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
      methods: {
        show_time: function (context, time_since_in_miliseconds) {
          let d = new Date()
          let result = Date(d.getTime() + time_since_in_miliseconds)
          return result
        }
      }
    }
</script>

<style>

</style>

