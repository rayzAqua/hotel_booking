import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/core/services/service.authentication.dart';
import 'package:hotel_booking/core/utils/obscure_text.dart';
import 'package:hotel_booking/presentation/widgets/custom_button.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_styles.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController userEmailController = TextEditingController();
  final TextEditingController userPasswordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier = Provider.of<ThemeNotifier>(context);
    var themeFlag = _themeNotifier.darkTheme;
    return WillPopScope(
      onWillPop: () => Future.value(false),
      child: Scaffold(
        backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
        appBar: AppBar(
          backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
          elevation: 0,
          automaticallyImplyLeading: false,
        ),
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  fit: FlexFit.loose,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Welcome Back",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        "You've been missed!",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w500,
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                      const SizedBox(
                        height: 54,
                      ),
                      Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            CustomTextField.customTextField(
                              hintText: 'Email',
                              inputType: TextInputType.text,
                              textEditingController: userEmailController,
                              validator: (val) =>
                                  !RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$')
                                          .hasMatch(val!)
                                      ? 'Enter an email'
                                      : null,
                              themeFlag: themeFlag,
                            ),
                            CustomTextField.customPasswordField(
                              themeFlag: themeFlag,
                              context: context,
                              validator: (val) =>
                                  val!.isEmpty ? 'Enter a password' : null,
                              onTap: () {
                                Provider.of<ObscureText>(context, listen: false)
                                    .toggleObs();
                              },
                              textEditingController: userPasswordController,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Don't have an account?",
                      style: kBodyText.copyWith(
                        color:
                            themeFlag ? AppColors.creamColor : AppColors.mirage,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.of(context).pushNamed(AppRouter.signupRoute);
                      },
                      child: Text(
                        ' Register',
                        style: kBodyText.copyWith(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                CustomButton.customBtnLogin(
                  buttonName: 'Sign In',
                  onTap: () {
                    clickLogin(context: context);
                  },
                  bgColor: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  textColor:
                      themeFlag ? AppColors.mirage : AppColors.creamColor,
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  clickLogin({required BuildContext context}) async {
    if (_formKey.currentState!.validate()) {
      int isValid =
          await Provider.of<AuthenticationNotifier>(context, listen: false)
              .login(
        email: userEmailController.text,
        password: userPasswordController.text,
      );
      print(isValid);
      if (isValid == 0) {
        Navigator.of(context).pushReplacementNamed(AppRouter.navRoute);
        SnackUtil.showSnackBar(
          context: context,
          text: 'Login Successful',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.green,
        );
      } else if (isValid == 1) {
        SnackUtil.showSnackBar(
          context: context,
          text: 'Please confirm your email',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.red,
        );
      } else {
        SnackUtil.showSnackBar(
          context: context,
          text: 'Email or Password wrong',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.red,
        );
      }
    }
  }
}
