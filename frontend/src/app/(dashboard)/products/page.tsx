"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockProducts } from "@/lib/data";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Management</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">Manage your cafe menu and inventory.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="flex flex-col bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-sm flex-1 overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <Input 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[var(--color-background)]"
            />
          </div>
          <Button variant="outline" className="shrink-0 bg-[var(--color-background)]">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-[var(--color-secondary)]/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.gst}%</TableCell>
                  <TableCell>
                    <span className={product.stock < 20 ? "text-red-500 font-medium" : ""}>
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Add a new item to your cafe menu.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" placeholder="E.g. Latte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input id="category" placeholder="Coffee" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price (₹)</Label>
              <Input id="price" type="number" placeholder="250" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gst" className="text-right">GST (%)</Label>
              <Input id="gst" type="number" placeholder="5" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" type="number" placeholder="100" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image URL</Label>
              <Input id="image" placeholder="https://..." className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t border-[var(--color-border)]">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Save Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
