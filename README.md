   <div>
                      {task.files.length > 0 && task?.files.map((file) => (
                            <li key={file._id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                {file.fileType.startsWith('image/') ? (
                                  <div className="relative">
                                    <img
                                      src={file.url}
                                      alt={file.fileName}
                                      className="w-28 h-28 object-cover rounded-sm border border-[#3a3a3a]"
                                    />
                                    <div
                                      className="text-xs truncate max-w-20 cursor-pointer"
                                      title={file.fileName}
                                    >
                                      {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
                                    </div>
                                    <button
                                      className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                                      // onClick={() => handleRemoveFile(index)}
                                    >
                                      <IoMdCloseCircle size={18} />
                                    </button>
                                  </div>
                                ) : file.fileType === 'application/pdf' ? (
                                  <div className="relative">
                                    <div className="w-28 h-28 border border-[#3a3a3a] rounded-sm overflow-hidden">
                                      <iframe
                                        src={file.url}
                                        title={file.fileName}
                                        className="w-full h-full"
                                        style={{ border: 'none', overflow: 'hidden' }}
                                        scrolling="no"
                                      />
                                    </div>
                                    <div
                                      className="text-xs truncate max-w-20 cursor-pointer"
                                      title={file.fileName}
                                    >
                                      {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
                                    </div>
                                    <button
                                      className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                                      // onClick={() => handleRemoveFile(index)}
                                    >
                                      <IoMdCloseCircle size={18} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="relative">
                                    <FaPaperclip className="text-blue-500 w-28 h-28" />
                                    <div
                                      className="text-xs truncate max-w-20 cursor-pointer"
                                      title={file.fileName}
                                    >
                                      {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
                                    </div>
                                    <button
                                      className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                                      // onClick={() => handleRemoveFile(index)}
                                    >
                                      <IoMdCloseCircle size={18} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                </div>
