import { createOrderTag, removeOrderTag, updateOrderNote } from "../../api/api";
import { formatDate } from "../../utils/helpers";
import { Order } from "../OrderManagement/interface";
import {
  CustomerOrdersTableProps,
  IGetCustomerOrdersResponse,
  OrderItem,
  OrderTag,
  OrderTagsProps,
} from "./interface";
import * as Popover from "@radix-ui/react-popover";
import { Check, Edit, StickyNote } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const existingTags = ["Urgent", "Pending", "Delivered"]; // Mocked existing tags

const OrderDetailsList: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-2">
      {items.map(
        ({
          id,
          product,
          quantity,
          price,
          currency,
          deliveryCost,
          status,
          createdAt,
        }) => (
          <div key={id} className="border-b pb-2 mb-4 last:border-none">
            {[
              { label: "Product", value: product.name },
              { label: "Quantity", value: quantity },
              { label: "Price", value: `${price} ${currency}` },
              { label: "Delivery Cost", value: deliveryCost },
              { label: "Status", value: status },
              { label: "Created", value: formatDate(createdAt) },
            ].map(({ label, value }) => (
              <p key={label} className="text-sm">
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const OrderRow: React.FC<{
  order: IGetCustomerOrdersResponse;
  expanded: boolean;
  onToggle: () => void;
}> = ({ order, expanded, onToggle }) => {
  const [suggestedTags, setSuggestedTags] = useState(existingTags);
  const [tagInput, setTagInput] = useState("");
  const [orderTags, setOrderTags] = useState(order.orderTags);
  const [openPopoverForOrder, setOpenPopoverForOrder] = useState<string | null>(
    null
  );
  const [newOrder, setNewOrder] = useState<IGetCustomerOrdersResponse>(order);

  const handleTagsUpdate = (updatedTags: OrderTag[]) => {
    setOrderTags(updatedTags);
  };

  const handleUpdateNote = (newNote: string) => {
    if (order) {
      setNewOrder({ ...order, note: newNote });
    }
  };

  useEffect(() => {}, [orderTags]);
  return (
    <>
      {/* Desktop View */}
      <tr className="hover:bg-gray-50 border-t cursor-pointer hidden md:table-row">
        <td
          className="py-4 px-6 text-center text-sm font-medium text-gray-700"
          onClick={onToggle}
        >
          {expanded ? "▼" : "▶"}
        </td>
        <td className="py-4 px-6 text-sm text-gray-800">{newOrder.id}</td>
        <td className="py-4 px-6 text-sm text-gray-800">{newOrder.status}</td>
        <td className="py-4 px-6 text-sm text-gray-800">
          {newOrder.deliveryStatus}
        </td>
        <td className="py-4 px-6 text-sm text-gray-800">
          {formatDate(newOrder.createdAt)}
        </td>
        <td className="table-cell">
          <OrderTags
            key={orderTags.length}
            orderId={newOrder.id}
            orderTags={orderTags}
            onTagsUpdate={handleTagsUpdate}
          />
        </td>
        <td>
          <OrderNote
            orderId={newOrder.id}
            note={newOrder.note}
            onUpdateNote={handleUpdateNote}
          />
        </td>
      </tr>
      {expanded && (
        <tr className="hidden md:table-row">
          <td colSpan={5} className="bg-gray-100">
            <NestedOrderTable items={newOrder.items} />
          </td>
        </tr>
      )}
    </>
  );
};

interface OrderNoteProps {
  orderId: string;
  note: string;
  onUpdateNote: (newNote: string) => void;
}

const OrderNote: React.FC<OrderNoteProps> = ({
  orderId,
  note,
  onUpdateNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (editedNote.trim() && editedNote !== note) {
      await updateOrderNote(orderId, editedNote);
      onUpdateNote(editedNote);
    }
    setIsEditing(false);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="table-cell text-blue-500 hover:text-blue-700">
          <NotebookPen />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="w-72 p-4 bg-white shadow-md rounded-lg border font-inter">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Note</h3>
            <button onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              className="w-full mt-2 p-2 border rounded resize-none"
              rows={4}
            />
          ) : (
            <p className="mt-2 text-gray-700">{note || "No note available"}</p>
          )}

          <div className="flex justify-end mt-3 space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
              </button>
            )}
          </div>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const OrderTags: React.FC<OrderTagsProps> = ({
  orderId,
  orderTags,
  onTagsUpdate,
}) => {
  const [tags, setTags] = useState<OrderTag[]>(orderTags);

  const [newTag, setNewTag] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setTags(orderTags);
  }, [orderTags]);

  const addTag = async () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    try {
      const createdTag = await createOrderTag(orderId, trimmedTag);

      if (createdTag?.id && createdTag?.name) {
        const updatedTags = [
          ...tags,
          {
            id: createdTag.id,
            tag: { id: createdTag.id, name: createdTag.name },
          },
        ];
        setTags(updatedTags);
        onTagsUpdate(updatedTags);
      }
    } catch (error) {
      console.error("Failed to add tag:", error);
    } finally {
      setNewTag("");
      setShowInput(false);
    }
  };

  const removeTag = async (tagId: string) => {
    await removeOrderTag(orderId, tagId);
    setTags(tags.filter((t) => t.tag.id !== tagId));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.tag.name}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            {tag.tag.name}
            <X
              className="ml-2 h-4 w-4 cursor-pointer hover:text-gray-300"
              onClick={() => removeTag(tag.tag.id)}
            />
          </div>
        ))}

        {showInput ? (
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onBlur={addTag}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            autoFocus
            className="border p-1 rounded text-sm"
          />
        ) : (
          <button
            onClick={(e) => {
              setShowInput(true);
            }}
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full text-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const CustomerOrdersTable: React.FC<CustomerOrdersTableProps> = ({
  customerOrders,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      {/* Desktop View */}
      <table className="w-full border-collapse border border-gray-200 hidden md:table">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="py-3 px-6 text-center"></th>
            {["ID", "STATUS", "DELIVERY STATUS", "CREATED", "TAGS", ""].map(
              (header) => (
                <th key={header} className="py-3 px-6 text-left font-light">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {customerOrders && customerOrders.length > 0 ? (
            customerOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expandedRows[order.id] || false}
                onToggle={() => toggleRow(order.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {customerOrders && customerOrders.length > 0 ? (
          customerOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md p-4 rounded-lg">
              <p className="text-sm">
                <strong>ID:</strong> {order.id}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm">
                <strong>Delivery Status:</strong> {order.deliveryStatus}
              </p>
              <p className="text-sm">
                <strong>Created:</strong> {formatDate(order.createdAt)}
              </p>
              <button
                onClick={() => toggleRow(order.id)}
                className="text-blue-500 text-sm mt-2"
              >
                {expandedRows[order.id] ? "Hide Details ▲" : "Show Details ▼"}
              </button>

              {expandedRows[order.id] && order.items?.length > 0 && (
                <OrderDetailsList items={order.items} />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

const NestedOrderTable: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="nested-table-cell text-center">No order items found</div>
    );
  }

  return (
    <table className="nested-table-container">
      <thead>
        <tr className="nested-table-header">
          {[
            "Product",
            "Quantity",
            "Price",
            "Delivery Cost",
            "Status",
            "Created",
          ].map((heading) => (
            <th key={heading} className="nested-table-header-cell">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(
          ({
            id,
            product,
            quantity,
            price,
            currency,
            deliveryCost,
            status,
            createdAt,
          }) => (
            <tr key={id} className="nested-table-row">
              <td className="nested-table-cell">{product.name}</td>
              <td className="nested-table-cell">{quantity}</td>
              <td className="nested-table-cell">
                {price.toFixed(2)} {currency}
              </td>
              <td className="nested-table-cell">{deliveryCost}</td>
              <td className="nested-table-cell">{status}</td>
              <td className="nested-table-cell">{formatDate(createdAt)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default CustomerOrdersTable;
