
// This file is not needed anymore as we're using the nested route structure
// The content is in app/(tabs)/properties/index.tsx and _layout.tsx
import React from 'react';
import { Redirect } from 'expo-router';

export default function PropertiesRedirect() {
  return <Redirect href="/(tabs)/properties" />;
}
