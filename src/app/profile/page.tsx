"use client";

import { useState } from "react";
import { mockUser, orders } from "@/data/mock-data";
import { Package, Heart, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useWishlist } from "@/components/wishlist-store";
import { useCart } from "@/components/cart-store";
import { VariantSelector } from "@/components/variant-selector";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [variantSelectorProduct, setVariantSelectorProduct] = useState<any>(null);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);

  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleAddToCartWithVariants = (product: any, selectedColor: string, selectedSize: string) => {
    const productWithVariants = {
      ...product,
      selectedColor,
      selectedSize,
    };
    cartDispatch({ type: "add", product: productWithVariants, quantity: 1 });
    wishlistDispatch({ type: "remove", productId: product.id });
  };

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">Order {order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={order.status === "delivered" ? "default" : "secondary"}
                    className="mb-2"
                  >
                    {order.status}
                  </Badge>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: M • Color: {item.product.colors[0]} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Reorder</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Wishlist</h2>
      {wishlistState.items.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start adding items to your wishlist to see them here
            </p>
            <Button asChild>
              <a href="/shop">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-4">
          {wishlistState.items.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="relative aspect-[1/1] mb-4 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <p className="font-medium mt-2">${product.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      if (product.colors.length > 0 || product.sizes.length > 0) {
                        setVariantSelectorProduct(product);
                        setIsVariantSelectorOpen(true);
                      } else {
                        cartDispatch({ type: "add", product, quantity: 1 });
                        wishlistDispatch({ type: "remove", productId: product.id });
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => wishlistDispatch({ type: "remove", productId: product.id })}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label className="text-sm font-medium">First Name</Label>
            <p className="text-sm text-muted-foreground">{mockUser.name.split(" ")[0]}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Last Name</Label>
            <p className="text-sm text-muted-foreground">Not set</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Shipping Addresses</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Default Address</h3>
            <p className="text-sm text-muted-foreground">
              {mockUser.address?.street}<br />
              {mockUser.address?.city}, {mockUser.address?.state} {mockUser.address?.zipCode}<br />
              {mockUser.address?.country}
            </p>
          </div>
          <Button variant="outline">Add New Address</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="order-updates" defaultChecked />
                <Label htmlFor="order-updates">Order updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="new-arrivals" defaultChecked />
                <Label htmlFor="new-arrivals">New arrivals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="promotional" />
                <Label htmlFor="promotional">Promotional emails</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="browsing-history" defaultChecked />
                <Label htmlFor="browsing-history">Save browsing history</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="recommendations" />
                <Label htmlFor="recommendations">Personalized recommendations</Label>
              </div>
            </div>
          </div>
          
          <Button variant="outline">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Profile" }
          ]} 
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {mockUser.name.split(" ")[0]}</p>
      </div>

      <nav className="flex space-x-1 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </nav>

      <div className="min-h-[400px]">
        {activeTab === "orders" && renderOrders()}
        {activeTab === "wishlist" && renderWishlist()}
        {activeTab === "profile" && renderProfile()}
        {activeTab === "settings" && renderSettings()}
      </div>

      {/* Variant Selector Modal */}
      {variantSelectorProduct && (
        <VariantSelector
          product={variantSelectorProduct}
          isOpen={isVariantSelectorOpen}
          onClose={() => {
            setIsVariantSelectorOpen(false);
            setVariantSelectorProduct(null);
          }}
          onAddToCart={handleAddToCartWithVariants}
        />
      )}
    </div>
  );
}


