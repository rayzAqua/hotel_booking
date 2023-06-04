import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/models/model.room.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/booking_notifier.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/core/services/service.hotel.dart';
import 'package:hotel_booking/presentation/widgets/custom_button.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_styles.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class BookingScreen extends StatefulWidget {
  final BookingScreenArgs bookingScreenArgs;
  BookingScreen({super.key, required this.bookingScreenArgs});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  String? selectedRoom;
  String? selectedQuantity;
  int selectedIndexQuan = -1;
  int selectedIndex = -1;
  int roomPrice = 0;
  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    var userData = Provider.of<AuthenticationNotifier>(context, listen: true);
    var bookingNotifier = Provider.of<BookingNotifier>(context, listen: true);
    HotelService hotelService = HotelService();
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      appBar: AppBar(
        backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
        title: Text(
          'Booking Room',
          style: TextStyle(
            color: themeFlag ? AppColors.creamColor : AppColors.mirage,
          ),
        ),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 30,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'User Details',
                style: TextStyle(
                  color: AppColors.yellowish,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
              ),
              Divider(
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
              Text(
                'Username: ${userData.username!}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
              ),
              Text(
                'Email: ${userData.userEmail!}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
              ),
              Text(
                'Phone: ${userData.userPhone!}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
              ),
              Divider(
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
              const SizedBox(
                height: 25,
              ),
              Text(
                'Hotel Details',
                style: TextStyle(
                  color: AppColors.yellowish,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
              ),
              Divider(
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
              Text(
                'Hotel Name: ${widget.bookingScreenArgs.hotelData.name}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
              ),
              Text(
                'Address: ${widget.bookingScreenArgs.hotelData.address}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                'Type: ${widget.bookingScreenArgs.hotelData.type}',
                style: TextStyle(
                  color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
              ),
              FutureBuilder<List<Room?>>(
                future: hotelService.getRoomHotel(
                    hotelId: widget.bookingScreenArgs.hotelData.id!),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    List<Room?> rooms = snapshot.data!;
                    List<String> roomNames = rooms
                        .where((room) => room != null)
                        .map((room) => room!.name!)
                        .toList();
                    List roomPrices = rooms
                        .where((room) => room != null)
                        .map((room) => room!.price!)
                        .toList();
                    return DropdownButton2(
                      hint: Text(
                        'Select Room',
                        style: TextStyle(
                          fontSize: 16,
                          color: Theme.of(context).hintColor,
                        ),
                      ),
                      items: roomNames
                          .map((item) => DropdownMenuItem<String>(
                                value: item,
                                child: Text(
                                  item,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    color: Color(0xfff5f5ff),
                                  ),
                                ),
                              ))
                          .toList(),
                      value: selectedRoom,
                      onChanged: (value) {
                        setState(() {
                          selectedRoom = value as String;
                          selectedIndex = roomNames.indexOf(value);
                          roomPrice = roomPrices[selectedIndex];
                        });
                      },
                      buttonStyleData: const ButtonStyleData(
                        height: 40,
                        width: 400,
                      ),
                      menuItemStyleData: const MenuItemStyleData(
                        height: 50,
                      ),
                      dropdownStyleData: const DropdownStyleData(
                        maxHeight: 200,
                      ),
                    );
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else {
                    return CircularProgressIndicator();
                  }
                },
              ),
              DropdownButton2(
                hint: Text(
                  'Select Quantity',
                  style: TextStyle(
                    fontSize: 16,
                    color: Theme.of(context).hintColor,
                  ),
                ),
                items: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                    .map((item) => DropdownMenuItem<String>(
                          value: item,
                          child: Text(
                            item,
                            style: const TextStyle(
                              fontSize: 16,
                              color: Color(0xfff5f5ff),
                            ),
                          ),
                        ))
                    .toList(),
                value: selectedQuantity,
                onChanged: (value) {
                  setState(() {
                    selectedQuantity = value as String;
                    selectedIndexQuan = [
                          '1',
                          '2',
                          '3',
                          '4',
                          '5',
                          '6',
                          '7',
                          '8',
                          '9'
                        ].indexOf(value) +
                        1;
                  });
                },
                buttonStyleData: const ButtonStyleData(
                  height: 40,
                  width: 400,
                ),
                menuItemStyleData: const MenuItemStyleData(
                  height: 50,
                  // customHeights: [40, 4],
                ),
                dropdownStyleData: const DropdownStyleData(
                  maxHeight: 200,
                ),
              ),
              Divider(
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
              const SizedBox(
                height: 30,
              ),
              Text(
                'Confirm Booking Dates',
                style: TextStyle(
                  color: AppColors.yellowish,
                  fontSize: 16,
                ),
                textAlign: TextAlign.left,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Start Date: ${bookingNotifier.startDate ?? '${DateTime.now()}'}',
                    style: TextStyle(
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.left,
                  ),
                  IconButton(
                    splashColor:
                        themeFlag ? AppColors.creamColor : AppColors.mirage,
                    icon: Icon(
                      Icons.edit_calendar,
                      size: 20,
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                    ),
                    onPressed: () {
                      StartDatePicker(
                        themeFlag: themeFlag,
                        context: context,
                        bookingNotifier: bookingNotifier,
                      );
                    },
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'End Date: ${bookingNotifier.endDate ?? '${DateTime.now()}'}',
                    style: TextStyle(
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.left,
                  ),
                  IconButton(
                    onPressed: () {
                      EndDatePicker(
                        themeFlag: themeFlag,
                        context: context,
                        bookingNotifier: bookingNotifier,
                      );
                    },
                    splashColor:
                        themeFlag ? AppColors.creamColor : AppColors.mirage,
                    icon: Icon(
                      Icons.edit_calendar,
                      size: 20,
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                'Total Price: ${TotalPrice(selectedIndexQuan, roomPrice, bookingNotifier.startDate!, bookingNotifier.endDate!)}',
                style: TextStyle(
                  color: AppColors.yellowish,
                  fontSize: 18,
                ),
                textAlign: TextAlign.left,
              ),
              const SizedBox(
                height: 20,
              ),
              CustomButton.customBtnLogin(
                buttonName: 'Book Room',
                onTap: () async {
                  DateFormat format = DateFormat("dd-MMMM-yyyy");
                  if (bookingNotifier.startDate == null &&
                      bookingNotifier.endDate == null) {
                    SnackUtil.showSnackBar(
                      context: context,
                      text: 'Please Select Dates',
                      textColor: AppColors.creamColor,
                      backgroundColor: Colors.red,
                    );
                  } else if (format
                          .parse(bookingNotifier.startDate!)
                          .isAfter(format.parse(bookingNotifier.endDate!)) ||
                      format.parse(bookingNotifier.startDate!).isAtSameMomentAs(
                          format.parse(bookingNotifier.endDate!))) {
                    SnackUtil.showSnackBar(
                      context: context,
                      text: 'Please Select the Correct Dates',
                      textColor: AppColors.creamColor,
                      backgroundColor: Colors.red,
                    );
                  } else {
                    var isSuccessful = await bookingNotifier.bookHotel(
                      widget.bookingScreenArgs.hotelData.id!,
                      hotelService.roomId![selectedIndex],
                      int.parse(selectedQuantity!),
                      userData.userId!,
                      userData.token!,
                      bookingNotifier.startDate!,
                      bookingNotifier.endDate!,
                    );
                    if (isSuccessful) {
                      SnackUtil.showSnackBar(
                        context: context,
                        text: 'Sucessfully Booked',
                        textColor: AppColors.creamColor,
                        backgroundColor: Colors.green,
                      );
                      Navigator.pop(context);
                    } else {
                      SnackUtil.showSnackBar(
                        context: context,
                        text:
                            'Insufficient quantity of room\nPlease Select Another Room',
                        textColor: AppColors.creamColor,
                        backgroundColor: Colors.red,
                      );
                    }
                  }
                },
                bgColor: themeFlag ? AppColors.creamColor : AppColors.mirage,
                textColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
              )
            ],
          ),
        ),
      ),
    );
  }
}

int TotalPrice(int quantity, int roomPrice, String startDate, String endDate) {
  int totalPrice = 1;
  DateFormat format = DateFormat("dd-MMMM-yyyy");
  if (format.parse(startDate).isBefore(format.parse(endDate))) {
    totalPrice = quantity *
        roomPrice *
        format.parse(endDate).difference(format.parse(endDate)).inDays;
  } else {
    totalPrice = 0;
  }
  return totalPrice;
}

class BookingScreenArgs {
  final Hotel hotelData;
  final dynamic userID;

  BookingScreenArgs({
    required this.userID,
    required this.hotelData,
  });
}

Future StartDatePicker({
  required bool themeFlag,
  required BuildContext context,
  required BookingNotifier bookingNotifier,
}) {
  final date = DateTime.now();
  return showDialog(
    context: context,
    builder: (BuildContext ctx) {
      return AlertDialog(
        backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
        content: Container(
          height: 200,
          width: 350,
          child: CupertinoDatePicker(
            minimumDate: DateTime.now(),
            maximumDate: DateTime(date.year, date.month + 1, date.day),
            mode: CupertinoDatePickerMode.date,
            onDateTimeChanged: (value) {
              String createdAt = DateFormat("dd-MMMM-yyyy").format(value);
              bookingNotifier.startDateSet(createdAt: createdAt);
            },
            initialDateTime: DateTime.now(),
          ),
        ),
      );
    },
  );
}

Future EndDatePicker({
  required bool themeFlag,
  required BuildContext context,
  required BookingNotifier bookingNotifier,
}) {
  final date = DateTime.now();

  return showDialog(
    context: context,
    builder: (BuildContext ctx) {
      return AlertDialog(
        backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
        content: Container(
          height: 200,
          width: 350,
          child: CupertinoDatePicker(
            // minimumDate: DateTime(date.year, date.month, date.day + 1),
            maximumDate: DateTime(date.year, date.month + 1, date.day),
            mode: CupertinoDatePickerMode.date,
            onDateTimeChanged: (value) {
              String createdAt = DateFormat("dd-MMMM-yyyy").format(value);
              bookingNotifier.endDateSet(createdAt: createdAt);
            },
          ),
        ),
      );
    },
  );
}
