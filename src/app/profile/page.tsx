"use client";

import { useState } from "react";
import { mockUser, orders } from "@/data/mock-data";
import { Package, Heart, User, Settings, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWishlist } from "@/components/wishlist-store";
import { useCart } from "@/components/cart-store";
import { VariantSelector } from "@/components/variant-selector";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [variantSelectorProduct, setVariantSelectorProduct] = useState<any>(null);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: mockUser.name.split(" ")[0] || "",
    lastName: mockUser.name.split(" ").slice(1).join(" ") || "",
    email: mockUser.email,
    phone: mockUser.phone || "",
  });
  
  const [editForm, setEditForm] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
  });

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      title: "Home",
      street: mockUser.address?.street || "",
      city: mockUser.address?.city || "",
      state: mockUser.address?.state || "",
      zipCode: mockUser.address?.zipCode || "",
      country: mockUser.address?.country || "",
      isDefault: true,
    }
  ]);

  const [editAddressForm, setEditAddressForm] = useState({
    id: "",
    title: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

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
            <p className="text-sm text-muted-foreground">{profileData.firstName || "Not set"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Last Name</Label>
            <p className="text-sm text-muted-foreground">{profileData.lastName || "Not set"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p className="text-sm text-muted-foreground">{profileData.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Phone</Label>
            <p className="text-sm text-muted-foreground">{profileData.phone || "Not set"}</p>
          </div>
          <Button variant="outline" onClick={() => {
            // Reset form to current profile data when opening
            setEditForm({
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: profileData.email,
              phone: profileData.phone,
            });
            setIsEditProfileOpen(true);
          }}>Edit Profile</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Shipping Addresses</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{address.title}</h3>
                  <div className="flex gap-1">
                  {!address.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setAddresses(addresses.map(addr => ({
                            ...addr,
                            isDefault: addr.id === address.id
                          })));
                        }}
                        className="text-muted-foreground hover:text-primary"
                        title="Set as default"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditAddressForm({
                          id: address.id,
                          title: address.title,
                          street: address.street,
                          city: address.city,
                          state: address.state,
                          zipCode: address.zipCode,
                          country: address.country,
                        });
                        setIsAddingNewAddress(false);
                        setIsEditAddressOpen(true);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {addresses.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setAddresses(addresses.filter(a => a.id !== address.id));
                        }}
                        className="text-muted-foreground hover:text-destructive"
                        title="Remove address"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {address.street || "No street address"}<br />
                  {address.city || "No city"}, {address.state || "No state"} {address.zipCode || "No ZIP"}<br />
                  {address.country || "No country"}
                </p>
                {address.isDefault && (
                  <div className="inline-flex items-center gap-1 mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Default Address</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setEditAddressForm({
                id: "",
                title: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
              });
              setIsAddingNewAddress(true);
              setIsEditAddressOpen(true);
            }}
          >
            Add New Address
          </Button>
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

      <nav className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-scroll sm:overflow-x-hidden">
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

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editForm.email}
                disabled
                className="bg-muted"
                placeholder="Email"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="Phone number"
                type="tel"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditProfileOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // Update the profile data with form values
                  setProfileData({
                    firstName: editForm.firstName,
                    lastName: editForm.lastName,
                    email: editForm.email,
                    phone: editForm.phone,
                  });
                  // Here you would typically save the changes to your backend
                  console.log("Saving profile changes:", editForm);
                  setIsEditProfileOpen(false);
                }}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Address Modal */}
      <Dialog open={isEditAddressOpen} onOpenChange={setIsEditAddressOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isAddingNewAddress ? "Add New Address" : "Edit Shipping Address"}</DialogTitle>
          </DialogHeader>
          
                      <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Address Title</Label>
                <Input
                  id="title"
                  value={editAddressForm.title}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, title: e.target.value })}
                  placeholder="e.g., Home, Work, Office"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={editAddressForm.street}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, street: e.target.value })}
                  placeholder="Street address"
                />
              </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={editAddressForm.city}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={editAddressForm.state}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, state: e.target.value })}
                  placeholder="State"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={editAddressForm.zipCode}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, zipCode: e.target.value })}
                  placeholder="ZIP code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={editAddressForm.country}
                  onChange={(e) => setEditAddressForm({ ...editAddressForm, country: e.target.value })}
                  placeholder="Country"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditAddressOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (isAddingNewAddress) {
                    // Add new address
                    const newAddress = {
                      id: Date.now().toString(),
                      title: editAddressForm.title,
                      street: editAddressForm.street,
                      city: editAddressForm.city,
                      state: editAddressForm.state,
                      zipCode: editAddressForm.zipCode,
                      country: editAddressForm.country,
                      isDefault: addresses.length === 0, // First address becomes default
                    };
                    setAddresses([...addresses, newAddress]);
                    console.log("Adding new address:", newAddress);
                  } else {
                    // Update existing address
                    setAddresses(addresses.map(addr => 
                      addr.id === editAddressForm.id 
                        ? { ...addr, ...editAddressForm }
                        : addr
                    ));
                    console.log("Updating address:", editAddressForm);
                  }
                  setIsEditAddressOpen(false);
                }}
                className="flex-1"
              >
                {isAddingNewAddress ? "Add Address" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


