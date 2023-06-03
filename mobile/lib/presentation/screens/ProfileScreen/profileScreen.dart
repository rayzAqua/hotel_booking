// ignore_for_file: sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/core/services/service.authentication.dart';
import 'package:hotel_booking/core/services/service.photo.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/settingScreen.dart';
import 'package:hotel_booking/presentation/widgets/custom_button.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:hotel_booking/presentation/widgets/loading_dialog.dart';
import 'package:image_network/image_network.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatefulWidget {
  final ProfileTaskArgs? profileTaskArgs;
  ProfileScreen({super.key, this.profileTaskArgs});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final TextEditingController userNameController = TextEditingController();
  final TextEditingController userPhoneController = TextEditingController();
  final TextEditingController userEmailController = TextEditingController();

  @override
  void initState() {
    userNameController.text = widget.profileTaskArgs!.user_name;
    userPhoneController.text = widget.profileTaskArgs!.user_phoneNo;
    userEmailController.text = widget.profileTaskArgs!.user_email;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    // PhotoService _photoService =
    //     Provider.of<PhotoService>(context, listen: true);
    AuthenticationNotifier _auth =
        Provider.of<AuthenticationNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    double _height = MediaQuery.of(context).size.height / 815;
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SingleChildScrollView(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 20,
              vertical: 5,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Your Profile',
                  style: TextStyle(
                    color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                    fontWeight: FontWeight.w600,
                    fontSize: 22,
                  ),
                ),
                const SizedBox(
                  height: 50,
                ),
                Center(
                  child: Stack(
                    children: [
                      Container(
                        width: 150,
                        height: 150,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(50),
                          child: Image.network(
                            widget.profileTaskArgs!.user_image!,
                          ),
                        ),
                        // child: _photoService.image == null
                        //     ? ClipRRect(
                        //         borderRadius: BorderRadius.circular(50),
                        //         child: Image.network(
                        //           widget.profileTaskArgs!.user_image!,
                        //         ),
                        //       )
                        //     : ClipRRect(
                        //         borderRadius: BorderRadius.circular(50.0),
                        //         // child: Image.file(File(_photoService.image!.path),
                        //       ),
                      ),
                      Positioned(
                        child: CircleAvatar(
                          radius: 18,
                          backgroundColor: Colors.white,
                          child: IconButton(
                            icon: const Icon(
                              Icons.edit,
                              color: Colors.blue,
                              size: 18,
                            ),
                            onPressed: () {
                              // _photoService.selectFile();
                            },
                          ),
                        ),
                        top: 115,
                        left: 110,
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Column(
                  children: [
                    CustomTextField.customTextField(
                      themeFlag: themeFlag,
                      hintText: 'Username',
                      inputType: TextInputType.text,
                      validator: (val) =>
                          val!.isEmpty ? 'Enter a Username' : null,
                      textEditingController: userNameController,
                    ),
                    CustomTextField.customTextField(
                      themeFlag: themeFlag,
                      hintText: 'Email',
                      inputType: TextInputType.text,
                      textEditingController: userEmailController,
                      enabled: false,
                    ),
                    CustomTextField.customTextField(
                      themeFlag: themeFlag,
                      hintText: 'Phone Number',
                      inputType: TextInputType.number,
                      maxLength: 11,
                      textEditingController: userPhoneController,
                      validator: (val) => val!.isEmpty || val.length < 11
                          ? 'Enter Your Phone Number'
                          : null,
                    ),
                    SizedBox(
                      height: _height * 80,
                    ),
                    CustomButton.customBtnLogin(
                      buttonName: 'Update Profile',
                      onTap: () async {
                        _auth.updateUserData(
                          username: userNameController.text,
                          userPhone: userPhoneController.text,
                        );
                        // Navigator.push(
                        //   context,
                        //   MaterialPageRoute(
                        //     builder: (context) => SettingScreen(),
                        //   ),
                        // );
                        // LoadingDialog.showLoaderDialog(
                        //   context: context,
                        //   themeFlag: themeFlag,
                        // );
                        // if (_photoService.image != null) {
                        //   await _photoService
                        //       .upload(
                        //     context: context,
                        //     userId: _auth.userId!,
                        //     token: _auth.token!,
                        //   )
                        //       .then(
                        //     (value) async {
                        //       if (value) {
                        //         bool isDone = await _auth.updateUserData(
                        //           username: userNameController.text,
                        //           userPhone: userPhoneController.text,
                        //         );
                        //         if (isDone) {
                        //           SnackUtil.showSnackBar(
                        //             context: context,
                        //             text: 'Success',
                        //             textColor: AppColors.creamColor,
                        //             backgroundColor: Colors.green,
                        //           );
                        //         } else {
                        //           SnackUtil.showSnackBar(
                        //             context: context,
                        //             text: 'Fail',
                        //             textColor: AppColors.creamColor,
                        //             backgroundColor: Colors.red,
                        //           );
                        //         }
                        //       } else {
                        //         if (_photoService.photo_url == null) {
                        //           bool isDone = await _auth.updateUserData(
                        //             username: userNameController.text,
                        //             userPhone: userPhoneController.text,
                        //           );
                        //           if (isDone) {
                        //             SnackUtil.showSnackBar(
                        //               context: context,
                        //               text: 'Success',
                        //               textColor: AppColors.creamColor,
                        //               backgroundColor: Colors.green,
                        //             );
                        //           } else {
                        //             SnackUtil.showSnackBar(
                        //               context: context,
                        //               text: 'Fail',
                        //               textColor: AppColors.creamColor,
                        //               backgroundColor: Colors.red,
                        //             );
                        //           }
                        //         }
                        //       }
                        //     },
                        //   );
                        // }
                        _auth.getUserData();
                        Navigator.of(context).pop();
                        // Navigator.of(context).pop();
                      },
                      bgColor:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                      textColor:
                          themeFlag ? AppColors.mirage : AppColors.creamColor,
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ProfileTaskArgs {
  final String user_name;
  final String user_email;
  final String user_phoneNo;
  String? user_image;

  ProfileTaskArgs({
    required this.user_name,
    required this.user_email,
    required this.user_phoneNo,
    this.user_image,
  });
}
