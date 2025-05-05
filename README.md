    <table className="">
            <thead className=" border-b border-t border-[#333] text-center">
              <tr className="text-left p-2">
                <th className="p-2 font-medium text-gray-400">Full name</th>
                <th className="p-2 font-medium text-gray-400">Display name</th>
                <th className="p-2 font-medium text-gray-400">Account type</th>
                <th className="p-2 font-medium text-gray-400">Joining date</th>
              </tr>
            </thead>
            <tbody>
              {project?.members.map((member : any) => (
                <tr className="border-b border-[#333]">
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#444] mr-3 overflow-hidden">
                      <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                    </div>
                    <span>{member.user.fullName} {member.user.secondName}</span>
                  </div>
                </td>
                <td className="p-2 text-gray-300">danielcx532</td>
                <td className="p-2">
                  <div className="flex items-center">
                    <span>Admin</span>
                    <FiChevronDown className="ml-2 text-gray-400" />
                  </div>
                </td>
                <td className="p-2 text-gray-300">April 12, 2025</td>
              </tr>
              ))}
            </tbody>
          </table>