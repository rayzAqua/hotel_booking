import 'package:cached_network_image/cached_network_image.dart';
import 'package:card_swiper/card_swiper.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/favourite_notifier.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:provider/provider.dart';

Widget imageSlider({required Hotel hotelModel, required BuildContext context}) {
  AuthenticationNotifier _auth =
      Provider.of<AuthenticationNotifier>(context, listen: true);
  return Container(
    height: MediaQuery.of(context).size.width - 50,
    child: Stack(
      clipBehavior: Clip.none,
      children: [
        Swiper(
          itemCount: hotelModel.photos!.length,
          pagination: const SwiperPagination(
            builder: SwiperPagination.dots,
          ),
          autoplay: true,
          itemBuilder: (BuildContext context, int index) {
            return CachedNetworkImage(
              imageUrl: hotelModel.photos![index],
              imageBuilder: (context, imageProvider) => Container(
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: imageProvider,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              errorWidget: (context, url, error) => Icon(Icons.error),
            );
          },
        ),
        Positioned(
          right: 10,
          bottom: -20,
          child: InkWell(
            onTap: () async {
              var data =
                  await Provider.of<FavouriteNotifier>(context, listen: false);
              bool isAdded = await data.addToFavourite(
                  userId: _auth.userId!,
                  token: _auth.token!,
                  hotelId: hotelModel.id!);
              if (isAdded) {
                SnackUtil.showSnackBar(
                  context: context,
                  text: 'Added to Favourite',
                  textColor: AppColors.creamColor,
                  backgroundColor: Colors.green,
                );
              } else {
                SnackUtil.showSnackBar(
                  context: context,
                  text: 'Hotel has been added to favorites',
                  textColor: AppColors.creamColor,
                  backgroundColor: Colors.red,
                );
              }
            },
            child: Container(
              height: 40,
              width: 40,
              decoration: BoxDecoration(
                color: Colors.pink.shade400,
                borderRadius: BorderRadius.circular(30),
              ),
              child: const Icon(
                Icons.favorite,
                color: Colors.white,
                size: 20,
              ),
            ),
          ),
        )
      ],
    ),
  );
}
