import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.booking.dart';

class BookingItem extends StatelessWidget {
  final Booking bookingModel;
  final bool themeFlag;
  final GestureTapCallback? onTap;
  BookingItem({
    super.key,
    required this.themeFlag,
    this.onTap,
    required this.bookingModel,
  });

  @override
  Widget build(BuildContext context) {
    double _width = MediaQuery.of(context).size.width / 375;
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(27, 5, 27, 0),
        child: Card(
          color: themeFlag ? AppColors.creamColor : AppColors.mirage,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          child: Container(
            width: double.maxFinite,
            padding: const EdgeInsets.symmetric(
              horizontal: 5,
              vertical: 3,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Container(
                    width: _width * 120,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.shadowColor.withOpacity(0.1),
                          spreadRadius: 1,
                          blurRadius: 1,
                          offset: Offset(0, 1),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(5),
                      child: CachedNetworkImage(
                        imageUrl: bookingModel.hotel!.photos![1],
                        imageBuilder: (context, imageProvider) => Container(
                          height: 80,
                          width: 70,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: imageProvider,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                        errorWidget: (context, url, error) => Icon(Icons.error),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 5),
                          child: Text(
                            'Name: ${bookingModel.hotel!.name!}',
                            maxLines: 1,
                            style: TextStyle(
                              color: themeFlag
                                  ? AppColors.mirage
                                  : AppColors.creamColor,
                              fontWeight: FontWeight.w500,
                              fontSize: _width * 12,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(
                            left: 6,
                            top: 2,
                          ),
                          child: Text(
                            'Address: ${bookingModel.hotel!.address!}',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: themeFlag
                                  ? AppColors.mirage
                                  : AppColors.creamColor,
                              fontSize: _width * 12,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(
                            left: 6,
                            top: 2,
                          ),
                          child: Text(
                            'Date: ${bookingModel.startDate!.toString()}',
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: themeFlag
                                  ? AppColors.mirage
                                  : AppColors.mirage,
                              fontSize: _width * 12,
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                            left: 6,
                            top: 2,
                          ),
                          child: Text(
                            'Price: \$${bookingModel.totalPrice.toString()}',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontSize: _width * 13,
                              color: AppColors.yellowish,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
