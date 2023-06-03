import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/core/services/service.authentication.dart';
import 'package:hotel_booking/presentation/screens/LoginScreen/loginScreen.dart';
import 'package:hotel_booking/presentation/screens/NavigationScreen/navigationScreen.dart';
import 'package:hotel_booking/presentation/widgets/custom_button.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_styles.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:provider/provider.dart';

class SignUpScreen extends StatelessWidget {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController userPasswordController = TextEditingController();
  final TextEditingController userEmailController = TextEditingController();
  final TextEditingController userPhoneController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier = Provider.of<ThemeNotifier>(context);
    var themeFlag = _themeNotifier.darkTheme;
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      appBar: AppBar(
        backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(
            Icons.arrow_back_ios_new,
            size: 24,
            color: themeFlag ? AppColors.creamColor : AppColors.mirage,
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
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
                        "Register",
                        style: kHeadline.copyWith(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        "Create new account",
                        style: kBodyText2.copyWith(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                      const SizedBox(
                        height: 40,
                      ),
                      Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            CustomTextField.customTextField(
                              themeFlag: themeFlag,
                              hintText: 'Username',
                              inputType: TextInputType.text,
                              textEditingController: usernameController,
                              validator: (val) =>
                                  val!.isEmpty ? 'Enter username' : null,
                            ),
                            CustomTextField.customTextField(
                              themeFlag: themeFlag,
                              hintText: 'Email',
                              textEditingController: userEmailController,
                              validator: (val) =>
                                  !RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$')
                                          .hasMatch(val!)
                                      ? 'Enter an email'
                                      : null,
                              inputType: TextInputType.text,
                            ),
                            CustomTextField.customPasswordField(
                              themeFlag: themeFlag,
                              context: context,
                              validator: (val) =>
                                  val!.isEmpty ? 'Enter password' : null,
                              onTap: () {},
                              textEditingController: userPasswordController,
                            ),
                            CustomTextField.customTextField(
                              themeFlag: themeFlag,
                              hintText: 'Enter PhoneNumber',
                              inputType: TextInputType.number,
                              maxLength: 10,
                              textEditingController: userPhoneController,
                              validator: (val) =>
                                  val!.isEmpty || val.length < 10
                                      ? 'Enter PhoneNumber'
                                      : null,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                    ],
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Already have an account? ",
                      style: kBodyText.copyWith(
                        color:
                            themeFlag ? AppColors.creamColor : AppColors.mirage,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        // Navigator.of(context).pushNamed(AppRouter.loginRoute);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LoginScreen(),
                          ),
                        );
                      },
                      child: Text(
                        'Sign In',
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
                  height: 20,
                ),
                CustomButton.customBtnLogin(
                  buttonName: 'Register',
                  onTap: () {
                    clickSignup(context: context);
                  },
                  bgColor: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  textColor:
                      themeFlag ? AppColors.mirage : AppColors.creamColor,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  clickSignup({required BuildContext context}) async {
    if (_formKey.currentState!.validate()) {
      int isValid = await AuthenticationService.register(
        usernameController.text,
        userEmailController.text,
        userPasswordController.text,
        userPhoneController.text,
      );
      if (isValid == 0) {
        Navigator.of(context).pushReplacementNamed(AppRouter.loginRoute);
        SnackUtil.showSnackBar(
          context: context,
          text: 'Signup Successful\nPlease Confirm Your Email Before Login',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.green,
        );
      } else if (isValid == 1) {
        userPasswordController.text = "";
        SnackUtil.showSnackBar(
          context: context,
          text: 'Email Already Exists',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.red,
        );
      } else if (isValid == 3) {
        SnackUtil.showSnackBar(
          context: context,
          text: 'Connection Failed',
          textColor: AppColors.creamColor,
          backgroundColor: Colors.red,
        );
      }
    }
  }

  showAlertDialog({
    required BuildContext context,
    required bool themeFlag,
  }) {
    Widget cancelButton = TextButton(
      child: const Text(
        'No',
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: Colors.blueAccent,
        ),
      ),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget continueButton = TextButton(
      child: const Text(
        'Yes',
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: Colors.blueAccent,
        ),
      ),
      onPressed: () {
        Navigator.of(context).pushReplacementNamed(AppRouter.loginRoute);
      },
    );
  }
}
