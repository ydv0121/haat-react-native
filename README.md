## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running the mobile app)

## Installation

Follow these steps to get your development environment set up:

1. Clone the repository
```bash
git clone https://github.com/ydv0121/haat-react-native
cd repository-name
```

2. Install dependencies
```bash
npm install
```

## Running the Application

To start the development server:
```bash
npx expo start
```

This will open the Expo development server in your browser. From here, you can:
- Press `a` to open Android emulator
- Press `i` to open iOS simulator
- Scan the QR code with your mobile device (requires Expo Go app)

## Available Scripts

- `npx expo start` - Starts the development server
- `npm test` - Runs the test suite
- `npm run build` - Creates a production build


## Features Implementation & Approach


### 1. Category List View
- Implemented using FlatList for optimal performance
- Key features:
  - Virtualized rendering for memory efficiency
  - Pull-to-refresh functionality
  - Smooth scrolling experience
- Implementation example:
```javascript
<FlatList
  data={categories}
  renderItem={renderCategoryItem}
  keyExtractor={item => item.id}
/>
```

### 3. Subcategory Implementation
- Used horizontal FlatList for subcategory navigation
- Features:
  - Horizontal scrolling tabs
  - Active state indication
  - Smooth animation transitions
- Performance optimizations:
  - Implemented memo for item components
  - Used getItemLayout for fixed-size items

### 4. Product Listing Carousel
- Implemented using react-native-reanimated-carousel
- Features:
  - Pagination effect
  - Smooth transitions
  - Memory efficient rendering
- Integration with FlatList for product items
```javascript
<Carousel
  data={productPages}
  renderItem={renderProductPage}
  onSnapToItem={handlePageChange}
/>
```

### 5. Animated Header Implementation
- Used React Native Animated API
- Features:
  - Dynamic header hiding on scroll
  - Sticky subcategory bar
  - Smooth scroll animations
- Implementation details:
```javascript
const scrollY = useRef(new Animated.Value(0)).current;
const headerTranslateY = scrollY.interpolate({
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
  extrapolate: 'clamp'
});
```

### 6. Smart Navigation
- Implemented snap-to-next for product lists
- Tab bar synchronization with scroll position
- Smooth scrolling to selected categories

## Challenges & Solutions

### 1. FlatList Header/Footer Re-rendering Issues
#### Challenge:
- Initial approach using FlatList header/footer components caused performance issues
- Complete screen re-renders on category selection
- Unwanted scroll position resets


### 2. Nested FlatList Implementation
#### Challenge:
- Parent FlatList couldn't track child FlatList viewport
- Inaccurate viewableItemConfig tracking
- Tab bar synchronization issues

```javascript
const onViewableItemsChanged = useCallback(({ viewableItems }) => {
  if (viewableItems.length > 0) {
    const visibleCategory = viewableItems[0].item.category;
    setActiveCategory(visibleCategory);
  }
}, []);
```

## Testing Instructions

### 1. Category Navigation
- Test scrolling through main categories
- Verify header collapse animation
- Check category selection feedback

### 2. Subcategory Interaction
- Test horizontal scrolling
- Verify active state indication
- Check snap-to-position behavior

### 3. Product List
- Test carousel navigation
- Verify pagination functionality
- Check product item rendering

### 4. Performance Testing
- Test with large datasets
- Verify scroll performance
- Check memory usage

### 5. Animation Testing
- Verify smooth header transitions
- Test scroll-linked animations
- Check carousel transitions

## Future Improvements
1. Implement virtualization for better performance with large datasets
2. Add gesture-based navigation
3. Optimize image loading and caching
4. Update from Animated to Reanmiated API
5. Performance improvements in Android during scroll.
