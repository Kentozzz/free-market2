class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    callback_for(:google)
  end

  def callback_for(provider)
    session["devise.sns_auth"] = User.from_omniauth(request.env["omniauth.auth"])
    @user = session["devise.sns_auth"][:user]
    sns_credential = user_sns[:sns_credential]

    if @user.persisted?
      ## @userが登録済み
      sns_credential.update(user_id: @user.id)
      sign_in_and_redirect @user, event: :authentication
    else
      ## @userが未登録
      @sns_auth = true
      redirect_to new_user_registration_path
    end
  end
end