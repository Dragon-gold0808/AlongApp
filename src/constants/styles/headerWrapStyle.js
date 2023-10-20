import {Sizes, Fonts} from '.';

export const headerWrapStyle = {
  absolute: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20.0,
    left: 15.0,
    right: 15.0,
  },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  text: {
    flex: 1,
    marginLeft: Sizes.fixPadding + 2.0,
    ...Fonts.blackColor20ExtraBold,
  },
};
