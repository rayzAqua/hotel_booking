import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/FeedbackScreen/widgets/feedback.appbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_button.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:provider/provider.dart';

class FeedbackScreen extends StatelessWidget {
  final TextEditingController ftitleController = TextEditingController();
  final TextEditingController fdescController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  double userRating = 3;
  FeedbackScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier = Provider.of<ThemeNotifier>(context);
    var themeFlag = _themeNotifier.darkTheme;
    double _height = MediaQuery.of(context).size.height / 815;

    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      appBar: feedbackAppBar(themeFlag: themeFlag),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 20,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  fit: FlexFit.loose,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        "We all need people who will give us feedback.\nThat's how we improve!",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w500,
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                      const SizedBox(
                        height: 60,
                      ),
                      Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            CustomTextField.customTextField(
                              hintText: 'Title',
                              inputType: TextInputType.text,
                              textEditingController: ftitleController,
                              validator: (val) =>
                                  val!.isEmpty ? 'Enter Title' : null,
                              themeFlag: themeFlag,
                            ),
                            CustomTextField.customTextField(
                              hintText: 'Description',
                              inputType: TextInputType.text,
                              textEditingController: fdescController,
                              validator: (val) =>
                                  val!.isEmpty ? 'Enter Description' : null,
                              themeFlag: themeFlag,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Rating: ',
                            style: TextStyle(
                              color: themeFlag
                                  ? AppColors.creamColor
                                  : AppColors.mirage,
                              fontSize: 26,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      RatingBar.builder(
                        initialRating: 3,
                        minRating: 1,
                        direction: Axis.horizontal,
                        allowHalfRating: false,
                        itemCount: 5,
                        itemPadding: EdgeInsets.symmetric(horizontal: 4),
                        itemBuilder: (context, _) => Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        onRatingUpdate: (rating) {
                          userRating = rating;
                        },
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: _height * 80,
                ),
                CustomButton.customBtnLogin(
                  buttonName: 'Send Feedback',
                  onTap: () {
                    Navigator.of(context).pop();
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
}
