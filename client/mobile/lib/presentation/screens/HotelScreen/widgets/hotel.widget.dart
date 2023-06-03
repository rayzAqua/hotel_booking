import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/widgets/hotel.footer.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/widgets/image.slider.dart';

Widget buildHotelData({
  required BuildContext context,
  required Hotel hotelModel,
  required themeFlag,
}) {
  return Column(
    children: [
      imageSlider(hotelModel: hotelModel, context: context),
      Container(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 24),
        decoration: BoxDecoration(
          color: themeFlag ? AppColors.mirage : AppColors.creamColor,
          borderRadius: const BorderRadius.only(
            topRight: Radius.circular(100),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    hotelModel.name!,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                    ),
                  ),
                  // Text(
                  //   "${hotelModel.cheapestPrice.toString()} \$",
                  //   style: TextStyle(
                  //     color: AppColors.yellowish,
                  //     fontWeight: FontWeight.bold,
                  //     fontSize: 16,
                  //   ),
                  // ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.location_city,
                        color:
                            themeFlag ? AppColors.creamColor : AppColors.mirage,
                        size: 16,
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Text(
                        hotelModel.address!,
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                        ),
                      ),
                    ],
                  ),
                  // Text(
                  //   "per room",
                  //   style: TextStyle(
                  //     color:
                  //         themeFlag ? AppColors.creamColor : AppColors.mirage,
                  //   ),
                  // ),
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 10,
                ),
                height: MediaQuery.of(context).size.height * 0.08,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.star,
                              size: 18,
                              color: Colors.amber,
                            ),
                            Text(
                              hotelModel.rating!.toString(),
                              style: TextStyle(
                                color: themeFlag
                                    ? AppColors.mirage
                                    : AppColors.creamColor,
                              ),
                            ),
                            const SizedBox(
                              width: 30,
                            ),
                            Text(
                              "75 reviews",
                              style: TextStyle(
                                color: themeFlag
                                    ? AppColors.mirage
                                    : AppColors.creamColor,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(
              height: 5,
            ),
            // Text(
            //   "What they offer",
            //   style: TextStyle(
            //     fontSize: 18,
            //     fontWeight: FontWeight.bold,
            //     color: themeFlag ? AppColors.creamColor : AppColors.mirage,
            //   ),
            // ),
            // const SizedBox(
            //   height: 5,
            // ),
            // Container(
            //   height: MediaQuery.of(context).size.height * 0.12,
            //   child: ListView.builder(
            //     itemCount: 2,
            //     scrollDirection: Axis.horizontal,
            //     itemBuilder: ((context, index) {
            //       return Card(
            //         elevation: 5,
            //         shadowColor: AppColors.yellowish,
            //         shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(15),
            //         ),
            //         child: Container(
            //           width: 100,
            //           decoration: BoxDecoration(
            //             borderRadius: BorderRadius.circular(15),
            //           ),
            //           child: Column(
            //             mainAxisAlignment: MainAxisAlignment.center,
            //             children: [
            //               Image.asset(
            //                 "assets/images/wifi.png",
            //                 height: 40,
            //                 width: 40,
            //               ),
            //               const SizedBox(
            //                 height: 5,
            //               ),
            //               const Text(
            //                 "Wifi",
            //                 style: TextStyle(color: Colors.grey),
            //               ),
            //             ],
            //           ),
            //         ),
            //       );
            //     }),
            //   ),
            // ),
            const SizedBox(
              height: 5,
            ),
            Text(
              "Description",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
            ),
            Text(
              hotelModel.description!,
              textAlign: TextAlign.justify,
              style: TextStyle(
                color: themeFlag ? AppColors.creamColor : AppColors.mirage,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            HotelFooter(
              hotelModel: hotelModel,
            ),
            const SizedBox(
              height: 15,
            ),
          ],
        ),
      ),
    ],
  );
}
