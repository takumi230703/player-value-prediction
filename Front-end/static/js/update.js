document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('input[name="Name"]').value="{{ player[1]}}";
    document.querySelector('select[name="Position"]').value="{{ player[2]}}";
    document.querySelector('select[name="age"]').value="{{ player[3]}}";
    document.querySelector('select[name="Country-from"]').value="{{ player[4]}}";
    document.querySelector('select[name="league-from"]').value="{{ player[5]}}";
    document.querySelector('select[name="Club-from"]').value="{{ player[6] }}";
    document.querySelector('select[name="Country-to"]').value="{{  player[7] }}";
    document.querySelector('select[name="league-to"]').value="{{ player[8] }}";
    document.querySelector('select[name="Club-to"]').value="{{ player[9] }}";

})