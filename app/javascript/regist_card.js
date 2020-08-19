document.addEventListener('turbolinks:load', function () {
  if (!$('#card_form')[0]) return false; //カード登録ページではないなら以降実行しない。

  Payjp.setPublicKey("pk_test_hogehogefugafuga");
  const regist_button = $("#regist_card");

  regist_button.on("click", function (e) { //登録ボタンを押したとき（ここはsubmitではなくclickにしておく）。
    e.preventDefault();
    
    const card = {
      number: $("#card_number_form").val(),
      cvc: $("#cvc_form").val(),
      exp_month: $("#exp_month_form").val(),
      exp_year: Number($("#exp_year_form").val()) + 2000
    };
  console.log(card); 

  Payjp.createToken(card, (status, response) => { //cardをpayjpに送信して登録する。
      
    if (status === 200) { //成功した場合
      alert("カードを登録しました");
      $('#card_form')[0].submit();
        // 追加ここまで
      } else { //失敗した場合
        alert("カード情報が正しくありません。");
        regist_button.prop('disabled', false);
      }

    });
  });
});