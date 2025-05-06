<script lang="ts">
  let {firstName = $bindable(""), lastName=$bindable("")} = $props(); 

</script>

<label class="label" for="firstName">Name</label>
<div class="field is-horizontal">
    <div class="field-body">
        <div class="field">
            <div class="control has-icons-left">
                <input class= input bind:value={firstName} type="text" placeholder="First Name" name="firstName">
                <span class="icon is-small is-left">
                    <i class="fa fa-id-card"></i>
                  </span>
            </div>
        </div>
        <div class="field">
            <div class="control has-icons-left">
                <input class= input bind:value={lastName} type="text" placeholder="Last Name" name="lastName">
                <span class="icon is-small is-left">
                    <i class="fa fa-id-card"></i>
                  </span>
            </div>
        </div>
    </div>
</div>